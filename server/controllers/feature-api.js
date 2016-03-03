var mongoose = require('mongoose');
var Feature = mongoose.model('Feature');

exports.features = function(req, res) {
  Feature.find(function(err, features) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(features);
  });
};

exports.addNewFeature = function(req, res) {
  var value = req.body.value;
  var label = req.body.label;

  Feature.findOne({ value: value }, function(err, feature) {
    if (err) throw err;
    if (feature) {
      // Feature exists. Update the feature label.
      feature.label = label;
      feature.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        res.jsonp(feature);
      });
    } else {      
      // Not exists. Add new feature.
      var newFeature = Feature({
        value: value,
        label: label
      });
      newFeature.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        res.jsonp(newFeature);  
      });      
    }
  });
};

exports.removeFeature = function(req, res) {
  var value = req.body.value;

  Feature.findOne({ value: value }, function(err, feature) {
    if (err) throw err;      
    feature.remove(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(feature);  
    });
  });
};
