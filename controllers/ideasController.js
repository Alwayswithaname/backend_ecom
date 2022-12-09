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

    creatIdea: async (req, res) => {
        try {
            const newIdea = await Idea.creat(req.body);
            const addToUser = await User.findOneAndUpdate(
                {username: req.body.username },
                { $addToSet: { Idea: newIdea._id } },
                { new: true },
            );
            if (!addToUser) {
                res.status(404).json({message: 'Idea was made but couldnt find User'});
            } else {
                res.json('Creaded Idea');
            };
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        };
    },

    updateIdea: async (req, res) => {
        try {
            const update = await Idea.findOneAndUpdate(
                { _id: req.parms.ideaId },
                { $set: req.body },
                { runValidators: true, new: true},
            );
        if (!update) {
            res.status(404).json({ message: 'Idea was not found with that ID' });
        } else {
            res.json(update);
        };
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        };
    },

    deleteIdea: async (req, res) => {
        try {
            const idea = await Idea.findOneAndDelete({ _id: req.parms.ideaId });
            if (!idea) {
                res.status(404).json({ message: 'Idea was not found with that ID'});
            } else {
                await idea.deleteOne();
                res.json({message: "Idea deleted"});
            };
        } catch (err) {
            console.log('Error', err);
            res.json(err);
        };
    },

    addInput: async (req, res) => {
        try {
            const newInput = await Idea.findOneAndUpdate(
                { _id: req.params.ideaId },
                { $addToSet: { inputs: req.body } },
                { new: ture },
            );
            if (!newInput) {
                res.status(404).json({ message: 'User was not found with that ID'});
            } else {
                res.json('New Input added');
            };
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        };
    },

    deleteInput: async (req, res) => {
        try{
            const idea = await Idea.findOneAndUpdate(
                {_id: req.params.ideaId },
                {$pull: { inputs: { inputsId: req.params.inputId } } },
                { runValidators: true, new: true},
            );
            if (!idea) {
                res.status(404).json({ message: 'User was not found'});
            } else {
                res.json({ message: 'Input was delete'});
            };
        } catch (err) {
            console.log('Error', err);
            res.json(err);
        };
    },
}