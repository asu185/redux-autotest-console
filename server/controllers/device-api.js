var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var fs = require('fs');
var mailer = require("nodemailer");
var AUTOTEST_DIR = __dirname + '/../../omlet-autotest/';
var REPORT_BASIC_PATH = __dirname + '/../../public/reports/';

exports.getDevices = function(req, res) {
  runCmd('adb devices', {}, function(content) {
    // console.log(content);
    var devices = [];

    content = content.split('\n');
    for (var index in content) {
      if (content[index].length > 0 && content[index].indexOf('\tdevice') != -1) {
        var device = {};
        device.name = content[index].replace('\tdevice', '');
        devices.push(device);
      }
    }

    // console.log(JSON.stringify(devices));
    syncDevicesStatus(devices, function() {      
      res.jsonp(devices);
    });
      
  });
};

exports.runTest = function(req, res) {
  var device = req.body.device;
  var apk = req.body.selectedApk;
  var install_flag = req.body.installFlag;
  var emails = req.body.emails.split(',');
  var cmd = 'cp ../config/';
  var options = {cwd: AUTOTEST_DIR};  

  var name = device.name;
  var feature = device.feature;
  var report_dir = name.replace(':', '.');
  var report_path = REPORT_BASIC_PATH + report_dir + '/';
  var report_name = new Date().getTime() + '.html ';

  if (install_flag) {
    cmd += 'install.rb features/support/app_installation_hooks.rb;'
  } else {
    cmd += 'not-install.rb features/support/app_installation_hooks.rb;'
  }
  cmd += 'calabash-android run ' + apk + ' ';

  mkdirSyncIfNotExist(REPORT_BASIC_PATH);
  mkdirSyncIfNotExist(report_path);

  // console.log('feature: ' + feature);
  if (feature === 'all') {
    setDeviceStatus(device, true, function() {
      cmd += ' --format html --out ' + report_path + report_name + ' ADB_DEVICE_ARG=' + name + ' SCREENSHOT_PATH=' + report_path;
      runCmd(cmd, options, function(result) {
        if (emails.length > 0) {
          emails.map(function(email) {
            sendMailTo(email, name);
          });  
        }
        setDeviceStatus(device, false);        
        res.jsonp({
          name: name, 
          report: report_name
        });
      });
    });
  } else {
    setDeviceStatus(device, true, function() {
      cmd += feature + ' --format html --out ' + report_path + report_name + ' ADB_DEVICE_ARG=' + name + ' SCREENSHOT_PATH=' + report_path;
      runCmd(cmd, options, function(result) {        
        if (emails.length > 0) {
          emails.map(function(email) {
            sendMailTo(email, name);
          });  
        }
        setDeviceStatus(device, false);        
        res.jsonp({
          name: name, 
          report: report_name
        });
      });  
    });    
  }
};

exports.emptyDeviceFeature = function(req, res) {
  var device = req.body.device;
  var name = device.name;
  setDeviceStatus(device, false);
  res.end(name);
};

exports.getDeviceScreenshots = function(req, res) {
  var device = req.body.device.replace(':', '.');
  var options = {cwd: REPORT_BASIC_PATH + device};

  runCmd('ls -Ur *.png', options, function(screenshots) {
    if (screenshots.length === 0) {
      res.jsonp('');
    } else {      
      screenshots = screenshots.trim().split('\n');
      res.jsonp(screenshots);  
    }
  });
};

exports.getDeviceReports = function(req, res) {
  var device = req.body.device_name.replace(':', '.');
  var options = {cwd: REPORT_BASIC_PATH + device};

  runCmd('ls -Ur *.html', options, function(reports) {   
    if (reports.length === 0) {
      res.jsonp('');
    } else {      
      reports = reports.trim().split('\n');
      res.jsonp(reports);  
    }
  });
};

exports.deleteDeviceReport = function(req, res) {
  var report = req.body.report;
  var device_name = req.body.device_name;

  fs.unlink('./public/' + report, function(err) {
    if (err) {
      console.log(err);
    }

    var report_name = report.split('/')[2];

    res.jsonp({
      name: device_name,
      report: report_name
    });
  })
}

function mkdirSyncIfNotExist(path) {
  if(!fs.existsSync(path)){
    fs.mkdirSync(path, 0766, function(err) {
      if(err){ 
        console.log(err);
        res.send("ERROR! Can't make the directory! \n");
      }
    });
  }
}

function syncDevicesStatus(connDevices, callback) {
  Device.find(function(err, devices) {
    for (var i = 0; i < devices.length; i++) {
      for (var j = 0; j < connDevices.length; j++) {
        if (devices[i].name === connDevices[j].name) {
          connDevices[j].lock = devices[i].lock;
          connDevices[j].feature = devices[i].feature;
        }
      }
    }
    // console.log(devices);
    // console.log(connDevices);
    callback && callback();
  });
}

function setDeviceStatus(device, lock, callback) {
  Device.findOne({ name: device.name }, function(err, target) {
    if (err) throw err;
    
    if (target) {      
      target.lock = lock;
      target.feature = device.feature;
      target.save(function(err) {
        if (err) throw err;
        callback && callback();
        // console.log('The device is updated');    
      });
    } else { /* if the device not found */
      var newDevice = Device({
        name: device.name,
        feature: device.feature,
        lock: lock
      });

      newDevice.save(function(err) {
        if (err) throw err;
        callback && callback();
        console.log('New device created.');
      });
    }
  });
}

function runCmd(cmd, options, callback) {
  var child_process = require('child_process');
  // console.log(options);
  console.log('Run cmd:', cmd);
  child_process.exec(cmd, options, function(err, stdout, stderr) {
    if (err) {
      console.log(err);
    }

    // console.log('stdout:', stdout);
    // console.log('stderr:', stderr);

    callback && callback(stdout);
  });
}

function sendMailTo(email, name) {
  // Use Smtp Protocol to send Email
  var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "from@gmail.com",
        pass: "password"
    }
  });

  var mail = {
    from: "Autotest Tool<from@gmail.com>",
    to: email,
    subject: name + " testing completed",
    text: name + " testing completed"
  }

  smtpTransport.sendMail(mail, function(error, response){
    if(error){
      console.log(error);
    } else{
      console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
  });
}