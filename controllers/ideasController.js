const { User, Idea, Input} = require('../models');

module.exports = {
    getIdea: async (req, res) => {
        try {
            const ideas = await Idea.find();
            res.json(ideas);
        } catch ( err ) {
            console.log('Error', err);
            res.json(err);
        }
    },

    getSoloUser: async (req, res) => {
        try {
            const idea = await Idea.findOne({ _id: req.parms.ideaId});
            if (!idea) {
                res.status(404).json({ message: 'Idea was not found with that ID'});
            } else {
                res.json(idea);
            }
        } catch (err) {
            console.log('Error', err);
            res.json(err);
        };
    },
}