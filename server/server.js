require('./models/device');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var apk_api = require('./controllers/apk-api');
var device_api = require('./controllers/device-api');
var feature_api = require('./controllers/feature-api');
var email_api = require('./controllers/email-api');
var multer  = require('multer');
var upload = multer({ dest: 'omlet-autotest/' });
var app = express();
var ip = require('../config').ip;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', ip);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

app.use(express.static(path.join(__dirname,"../public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../public');
app.set('view options', { layout: false });

app.get('/api/apk-list', apk_api.apkList);
app.post('/api/resign-apk', apk_api.resignApk);
app.post('/api/upload-apk', upload.single('file'), apk_api.uploadApk);

app.get('/api/devices', device_api.getDevices);
app.post('/api/run-test', device_api.runTest);
app.post('/api/empty-device-feature', device_api.emptyDeviceFeature);
app.post('/api/screenshots', device_api.getDeviceScreenshots);
app.post('/api/delete-screenshot', device_api.deleteDeviceScreenshot);
app.post('/api/reports', device_api.getDeviceReports);
app.post('/api/delete-report', device_api.deleteDeviceReport);

app.get('/api/features', feature_api.features);
app.post('/api/update-features', feature_api.updateFeatures);

app.get('/api/emails', email_api.emails);
app.post('/api/update-emails', email_api.updateEmails);

app.get('/screenshots/:device', function(req, res) {
  var device = req.params.device;
  res.render('screenshots', {
    device: device,
    ip: ip,
  });
});

var url = 'mongodb://localhost/redux-autotest';
mongoose.connect(url, function(err) {
  if (err) {
    console.error('Could not connect to MongoDB!');
    console.log(err);
  }
});

app.listen(8888, function() {
    console.log("Started listening on port", 8888);
});
