// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorDataSchema = new Schema({
    LastSeen:{
        type:String,
        required: false
    },
    IP:  {
        type: String,        
        required: false
    },
    UID:  {
        type: String,        
        required: false
    },
    Name:  {
        type: String,        
        required: false
    },
    SW:  {
        type: Number,        
        required: false
    },
    Vdd:  {
        type: Number,        
        required: false
    },
    CpuTemp:  {
        type: Number,        
        required: false
    },
    AccTemp:  {
        type: Number,        
        required: false
    },
    WakeUp:  {
        type: String,
        required: false
    },
    AccDataX:  {
        type: Number,        
        required: false
    },
    AccDataY:  {
        type: Number,        
        required: false
    },
    AccDataZ:  {
        type: Number,        
        required: false
    }
}, {
    timestamps: true
});


// the schema is useless so far
// we need to create a model using it
var sensorDatas = mongoose.model('SensorData', sensorDataSchema);

// make this available to our Node applications
module.exports = sensorDatas;