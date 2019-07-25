var mongoose = require('mongoose');

var emergencySchema = new mongoose.Schema({
    
    Phone_No: String,
    emergency_no: String
})

module.exports = mongoose.model('emergencycontact', emergencySchema);