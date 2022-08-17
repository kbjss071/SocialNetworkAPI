const { Schema, model } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date)=> moment(date).format("MMM Do YY")
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Reaction = model("reaction", reactionSchema);

module.exports = Reaction;