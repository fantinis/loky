// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sensorDataSchema = new Schema({
    ip:  {
        type: String,        
        required: false
    },
    uid:  {
        type: String,        
        required: false
    },
    name:  {
        type: String,        
        required: false
    },
    sw:  {
        type: Number,        
        required: false
    },
    vdd:  {
        type: Number,        
        required: false
    },
    cpuTemp:  {
        type: Number,        
        required: false
    },
    accTemp:  {
        type: Number,        
        required: false
    },
    accDataX:  {
        type: Number,        
        required: false
    },
    accDataY:  {
        type: Number,        
        required: false
    },
    accDataZ:  {
        type: Number,        
        required: false
    },
    WakeUp:  {
        type: String,
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