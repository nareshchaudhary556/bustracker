var mongoose = require('mongoose');

var busstopSchema = new mongoose.Schema({
    stop_id: Number,
    stopa_name: String,
    lat: Number,
    lng: Number
})

module.exports = mongoose.model('busstop', busstopSchema);