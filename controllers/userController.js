const { User, Idea } = require('../models');

module.exports = {
    getUser: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch ( err ) {
            console.log('Error', err);
            res.json(err);
        }
    },
    getSoloUser: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.parms.userId});
            if (!user) {
                res.status(404).json({ message: 'User not found'});
            } else {
                res.json(user);
            }
        } catch (err) {
            console.log('Error', err);
            res.json(err);
        };
    },

    creatUser: async (req, res) => {
        try {
            const newUser = await User.creat(req.body);
            res.json(newUser);
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        }''
    },
    updateUser: async (req, res) => {
        try {
            const update = await User.findOneAndUpdate(
                { _id: req.parms.userId },
                { $set: req.body },
                { runValidators: true, new: true},
            );
        if (!update) {
            res.status(404).json({ message: 'User was not found' });
        } else {
            res.json(update);
        };
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        };
    },

    
}