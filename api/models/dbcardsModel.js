'use strict';

import mongoose from 'mongoose';

let Schema = mongoose.Schema,
    GreetSchema = new Schema({
        name: {
            type: String,
            Required: 'Enter your name'
        },
        text: {
            type: String,
            Required: 'Enter greet text'
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    }),
    CharacterSchema = new Schema({
        name: {
            type: String,
            Required: 'Enter character name'
        },
        type: {
            type: Number,
            enum: [0, 1],
            default: [0]
        },
        picture: {
            type: String,
            Required: 'Enter character picture base64'
        },
        energy: {
            type: Number,
            Required: 'Enter character remaining energy'
        },
        max_energy: {
            type: Number,
            Required: 'Enter character max energy'
        },
        attacks: {
            type: Array,
            Required: 'Enter character attacks'
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
    }),
    SkillSchema = new Schema({
        name: {
            type: String,
            Required: 'Enter skill name'
        },
        type: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5, 6, 7],
            default: [0]
        },
        energy: {
            type: Number,
            Required: 'Enter skill energy'
        },
        combo: {
            type: Number,
            Required: 'Enter skill combo'
        },
        picture: {
            type: String,
            Required: 'Enter skill picture base64'
        },
        created_at: {
            type: Date,
            default: Date.now
        }
    });

module.exports = mongoose.model('Greet', GreetSchema);
module.exports = mongoose.model('Character', CharacterSchema);
module.exports = mongoose.model('Skill', SkillSchema);
