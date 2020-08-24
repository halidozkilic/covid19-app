var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var heat = new Schema({

    _id:{type:String,require:true},
    lat: {type:String, require:true},
    lon:{type:String, require:true},
    heat:{type:String, require:true},
    date:{type:String, require:true}
});


module.exports = mongoose.model('Heat',heat);