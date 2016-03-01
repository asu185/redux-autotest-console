var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  name: {
    type: String,
    default: '',
    require: true,
    trim: true
  },
  feature: {
    type: String,
    default: '',
    require: true,
    trim: true
  },
  lock: {
    type: Boolean,
    default: false,
    require: true
  }
});

mongoose.model('Device', deviceSchema);