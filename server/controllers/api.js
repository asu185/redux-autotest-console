var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var fs = require('fs');
var autotest_dir = __dirname + '/../../omlet-autotest/';
var config_dir = '../../config/';

exports.features = function(req, res) {
  fs.readFile('./config/features.txt', 'utf8', function (err, result) {
    if (err) {
      return console.log(err);
    }
    
    var defaultFeatures = [{ value: 'all', label: 'All' }];
    var features = result.split('\n');
    features = features.map(function(feature) {
      var value = feature.split(' ')[0];
      var label = feature.split(' ')[1];
      return { value: value, label: label };
    });

    features = defaultFeatures.concat(features);
    // console.log(features);
    res.jsonp(features);
  });
};

exports.apkList = function(req, res) {
  var options = {cwd: autotest_dir};

  runCmd('ls *.apk', options, function(result) {
    var apks = [];
    result = result.split('\n');
    for (var i in result) {
      if (result[i].indexOf('.apk') != -1) {
        apks.push(result[i]);
      }
    }
    res.jsonp(apks);
  });
};

exports.devices = function(req, res) {
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

exports.run = function(req, res) {
  var device = req.body.device;
  var apk = req.body.selectedApk;
  var install_flag = req.body.installFlag;
  var cmd = 'cp ' + config_dir;
  var options = {cwd: autotest_dir};
  var report_basic_dir = options.cwd + 'reports/';

  var id = device.name;
  var feature = device.feature;
  var report_dir = report_basic_dir + id + '/';

  if (install_flag) {
    cmd += 'install.rb features/support/app_installation_hooks.rb;'
  } else {
    cmd += 'not-install.rb features/support/app_installation_hooks.rb;'
  }
  cmd += 'calabash-android run ' + apk + ' ';

  if(!fs.existsSync(report_basic_dir)){
    fs.mkdirSync(report_basic_dir, 0766, function(err){
      if(err){ 
        console.log(err);
        res.send("ERROR! Can't make the directory! \n");
      }
    });
  }

  if(!fs.existsSync(report_dir)){
    fs.mkdirSync(report_dir, 0766, function(err){
      if(err){ 
        console.log(err);
        res.send("ERROR! Can't make the directory! \n");
      }
    });
  }

  // console.log('feature: ' + feature);
  if (feature.length === 0) {  /* if the feature is either 'undefined' nor empty */        
    setDeviceStatus(device, false);
    res.end('empty feature');
  } else if (feature === 'all') {
    setDeviceStatus(device, true, function() {
      feature = '';
      cmd += feature + ' --format html --out ' + report_dir + id + '_report.html ' + 'ADB_DEVICE_ARG=' + id + ' SCREENSHOT_PATH=' + report_dir;
      runCmd(cmd, options, function(result) {
        setDeviceStatus(device, false);
        res.end('done');
      });
    });    
  } else {
    setDeviceStatus(device, true);
    cmd += feature + ' --format html --out ' + report_dir + id + '_report.html ' + 'ADB_DEVICE_ARG=' + id + ' SCREENSHOT_PATH=' + report_dir;
    runCmd(cmd, options, function(result) {
      setDeviceStatus(device, false);
      res.end('done');
    });
  }

};

exports.resign = function(req, res) {
  var options = {cwd: autotest_dir};
  var apk = req.body.selectedApk;
  var cmd = 'calabash-android resign ' + apk;

  runCmd(cmd, options, function(result) {
    // console.log(result);
    res.jsonp(result);
  });
};

function runCmd(cmd, options, callback) {
  var child_process = require('child_process');
  // console.log(options);
  // console.log(cmd);
  child_process.exec(cmd, options, function(err, stdout, stderr) {
    if (err) {
      return console.log(err);
    }
    if (callback) {
      callback(stdout);
    }
    if (stderr) {
      callback(stderr);
    }
  });
}

function syncDevicesStatus(connDevices, callback) {
  Device.find(function(err, devices) {
    for (var i = 0; i < devices.length; i++) {
      for (var j = 0; j < connDevices.length; j++) {
        if (devices[i].name === connDevices[j].name) {
          connDevices[j].isRunning = devices[i].isRunning;
          connDevices[j].feature = devices[i].feature;
        }
      }
    }
    // console.log(devices);
    // console.log(connDevices);
    callback && callback();
  });
}

function setDeviceStatus(device, isRunning, callback) {
  Device.findOne({ name: device.name }, function(err, target) {
    if (err) throw err;
    
    if (target) {      
      target.isRunning = isRunning;
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
        isRunning: isRunning
      });

      newDevice.save(function(err) {
        if (err) throw err;
        callback && callback();
        console.log('New device created.');
      });
    }
  });
}