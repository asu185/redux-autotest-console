var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var emailSchema = new Schema({
  value: {
    type: String,
    default: '',
    require: true,
    trim: true
  },
  label: {
    type: String,
    default: '',
    require: true,
    trim: true
  }
});

mongoose.model('Email', emailSchema);