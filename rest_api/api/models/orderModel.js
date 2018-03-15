'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product'
            },
            scanned: {
                type: Boolean,
                default: false
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],

    created_date: {
        type: Date,
        default: Date.now
    },

    preparator: {
        type: Schema.Types.ObjectId,
        ref: 'Preparator',
        default: null
    }
});

module.exports = mongoose.model('Order', schema);