var fs = require('fs');

exports.features = function(req, res) {   
  fs.readFile('./config/features.txt', 'utf8', function (err, content) {   
    if (err) {    
      console.log(err);
    }     
    var features = FeatureContentToOptions(content);      
    res.jsonp(features);    
  });   
};

exports.updateFeatures = function(req, res) {
  var featureContent = req.body.features;

  fs.writeFile('./config/features.txt', featureContent, 'utf8', function (err) {   
    if (err) {    
      console.log(err);
    }
    var features = FeatureContentToOptions(featureContent);    
    res.jsonp(features);
  });   
}

function FeatureContentToOptions(content) {
  return content.trim().split('\n').map(function(feature) {   
    var value = feature.split(' #')[0];    
    var label = feature.split(' #')[1];    
    return { value: value, label: label };    
  });
}