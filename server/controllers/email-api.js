var fs = require('fs');

exports.emails = function(req, res) {   
  fs.readFile('./config/emails.txt', 'utf8', function (err, content) {   
    if (err) {    
      console.log(err);
    }     
    var emails = emailContentToOptions(content);      
    res.jsonp(emails);    
  });   
};

exports.updateEmails = function(req, res) {
  var emailContent = req.body.emails;

  fs.writeFile('./config/emails.txt', emailContent, 'utf8', function (err) {   
    if (err) {    
      console.log(err);
    }
    var emails = emailContentToOptions(emailContent);    
    res.jsonp(emails);
  });   
}

function emailContentToOptions(content) {
  return content.trim().split('\n').map(function(email) {       
    return { value: email, label: email };    
  });
}