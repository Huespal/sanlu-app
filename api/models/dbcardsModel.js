'use strict';

import mongoose from 'mongoose';

let Schema      = mongoose.Schema,
    CardSchema  = new Schema({
        name: {
            type: String,
            Required: 'Enter card name'
        },
        type: {
            type: Number,
            enum: [0, 1],
            default: [0]
        },
        picture: {
            type: String,
            Required: 'Enter card picture url'
        },
        energy: {
            type: Number,
            Required: 'Enter card remaining energy'
        },
        max_energy: {
            type: Number,
            Required: 'Enter card max energy'
        },
        attacks: {
            type: Array,
            Required: 'Enter card attacks'
        },
        status: {
            type: Number,
            enum: [0, 1],
            default: [0]
        },
        created_at: {
            type: Date,
            default: Date.now
        }
});

module.exports = mongoose.model('Card', CardSchema);