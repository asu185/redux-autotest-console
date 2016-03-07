var mongoose = require('mongoose');
var Email = mongoose.model('Email');

exports.emails = function(req, res) {
  Email.find(function(err, features) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }
    res.jsonp(features);
  });
};

exports.addNewEmail = function(req, res) {
  var value = req.body.value;
  var label = req.body.label;

  Email.findOne({ value: value }, function(err, email) {
    if (err) throw err;
    if (email) {
      // Email exists. Update the email label.
      email.label = label;
      email.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        res.jsonp(email);
      });     
    } else {      
      // Not exists. Add new email.
      var newEmail = Email({
        value: value,
        label: label
      });
      newEmail.save(function(err) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        }
        res.jsonp(newEmail);  
      });      
    }
  });
};

exports.removeEmail = function(req, res) {
  var value = req.body.value;

  Email.findOne({ value: value }, function(err, email) {
    if (err) throw err;      
    email.remove(function(err) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      }
      res.jsonp(email);  
    });
  });
};
