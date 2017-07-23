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
            Required: 'Enter card type (DB, Z, GT)'
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
            type: [
                {
                    type: String,
                    enum: ['Attack 1', 'Attack 2', 'Attack 3']
                }
            ],
            Required: 'Enter card attacks'
        },
        status: {
            type: [
                {
                    type: String,
                    enum: ['dead', 'alive']
                }
            ],
            default: ['alive']
        },
        created_at: {
            type: Date,
            default: Date.now
        }
});

module.exports = mongoose.model('Card', CardSchema);