var mongoose = require('mongoose');

var registerSchema = new mongoose.Schema({
  full_name:String,
  Email_ID: String,
  Phone_No: String,
  password:String
})

module.exports = mongoose.model('registeruser', registerSchema);