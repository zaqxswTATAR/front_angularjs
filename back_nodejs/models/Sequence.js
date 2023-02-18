const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let sequenceSchema = new Schema({
    num1: {
        type: Number
    },
    num2: {
        type: Number
    },
    num3: {
        type: Number
    },
    num4: {
        type: Number
    },
    numX: {
        type: Number
    },
    numY: {
        type: Number
    },
    numZ: {
        type: Number
    }
}, {
    collection: 'sequences' 
})

module.exports = mongoose.model('Sequence', sequenceSchema);