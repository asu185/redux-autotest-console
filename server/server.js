var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./models/device');
var api = require('./controllers/api');
var multer  = require('multer');
var upload = multer({ dest: 'omlet-autotest/' });
var app = express();

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://59.127.111.67:8888');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
};

app.use(express.static(path.join(__dirname,"../public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

app.get('/api/features', api.features);
app.get('/api/apk-list', api.apkList);
app.get('/api/devices', api.devices);
app.post('/api/run', api.run);
app.post('/api/resign', api.resign);
app.post('/api/upload-apk', upload.single('file'), api.uploadApk);

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
