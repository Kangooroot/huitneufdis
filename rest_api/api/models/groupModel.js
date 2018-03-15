'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Order'
        }
    ],

    created_date: {
        type: Date,
        default: Date.now
    },

    weight: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Group', schema);