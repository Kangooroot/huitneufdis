'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    preparator: {
        type: Schema.Types.ObjectId,
        ref: 'Preparator'
    },

    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Alert', schema);