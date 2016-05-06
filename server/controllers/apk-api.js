var fs = require('fs');
var autotestDirName = require('../../config').autotestDirName;
var AUTOTEST_DIR = __dirname + '/../../' + autotestDirName + '/';

exports.apkList = function(req, res) {
  var options = {cwd: AUTOTEST_DIR};

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

exports.resignApk = function(req, res) {
  var options = {cwd: AUTOTEST_DIR};
  var apk = req.body.selectedApk;
  var cmd = 'calabash-android resign ' + apk;

  runCmd(cmd, options, function(result) {
    // console.log(result);
    res.jsonp(result);
  });
};

exports.uploadApk = function(req, res) {  
  var file = req.file;
  var tmp_path = file.path;
  var target_path = file.destination + file.originalname;

  console.log('file:', file);

  fs.rename(tmp_path, target_path, function(err) {
    if (err) throw err;    
    res.end('Uploaded.');
  });
};

function runCmd(cmd, options, callback) {
  var child_process = require('child_process');
  // console.log(options);
  console.log('\033[96mRun cmd:\033[39m\n' + cmd);
  console.log('\n');
  child_process.exec(cmd, options, function(err, stdout, stderr) {
    if (err) {
      console.log('\033[96mErr:\033[39m\n' + err);
      console.log('\n');
    }

    if (stdout) {
      console.log('\033[96mStdout:\033[39m\n' + stdout);
      console.log('\n');
    }

    if (stderr) {
      console.log('\033[96mStderr:\033[39m\n' + stderr);
      console.log('\n');
    }

    callback && callback(stdout);
  });
}