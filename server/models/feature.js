var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var featureSchema = new Schema({
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

mongoose.model('Feature', featureSchema);