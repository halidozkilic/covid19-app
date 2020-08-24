var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var patient = new Schema({

    _id:{type:String,require:true},
    name: {type:String, require:true},
    surname:{type:String, require:true},
    tc:{type:String, require:true},
    phone:{type:String, require:true}
});


module.exports = mongoose.model('Patient',patient);