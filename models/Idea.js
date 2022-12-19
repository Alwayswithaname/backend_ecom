const { Schema, model } = require('mongoose');
const Inputs = require('./Input');

const ideaSchema = new Schema(
    {
        ideaText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return `${date.toLocaleDateString('en-us', { month: 'short'})} ${formatDay(date.getDate())}, ${date.getFullYear()} at ${date.toLocaleTimeString('en-us',)}`
            },
        },
        username: {
            type: String,
            required: true,
        },
        Inputs: [Inputs],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    },
);

const formatDay = (day) => {
    if (day > 3 && day < 21) return day+'th';
    switch ( day % 10) {
        case 1: return day+'st';
        case 2: return day+"nd";
        case 3: return day+"rd";
        default: return day+"th";
    };
};

ideaSchema
    .virtual('inputCount')
    .get(function () {
        return this.Inputs.length;
    });


const Idea = model('idea', ideaSchema);

module.exports = Idea;