'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    name: String,

    quantity: {
        type: Number,
        default:0
    },

    weight: Number,

    position: {
        X: Number,
        Y: Number,
        height: Number,
        block: Number
    }
});

module.exports = mongoose.model('Product', schema);