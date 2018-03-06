'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({

    name: String,

    email: String,

    password: String,

    maxWeight: Number
});

module.exports = mongoose.model('Preparator', schema);