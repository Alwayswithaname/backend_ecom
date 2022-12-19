const { User, Idea } = require('../models');

module.exports = {
    getUsers: async (req, res) => {
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
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                res.status(404).json({ message: 'User was not found with that ID'});
            } else {
                
                res.json(user);

            }
        } catch (err) {
            console.log('Error', err);
            res.json(err);
        };
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        };
    },

    updateUser: async (req, res) => {
        try {
            const update = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true},
            );
        if (!update) {
            res.status(404).json({ message: 'User was not found with that ID' });
        } else {
            res.json(update);
        };
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        };
    },

    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId).clone();
            const deleteUserIdeas = Idea.deleteMany({
                "_id": {
                    $in: user.ideas,
                },
            });

            if (!user) {
                res.status(404).json({ message: 'User was not found with that ID'});
            } else {
                await user.deleteOne();
                res.json({message: "User deleted"});
            };
        } catch (err) {
            console.log('Error', err);
            res.json(err);
        };
    },

    addFriend: async (req, res) => {
        try {
            const newFriend = await User.findOneAndUpdate(
                { username: req.body.username },
                { $addToSet: { friends: req.params.friendId } },
                { new: true },
            );
            if (!newFriend) {
                res.status(404).json({ message: 'User was not found with that ID'});
            } else {
                res.json('New friend added');
            };
        } catch (err) {
            console.log('Error', err);
            res.status(500).json(err);
        };
    },

    deleteFriend: async (req, res) => {
        try{
            const user = await User.findOneAndUpdate(
                {username: req.body.username },
                {$pull: { friends: req.params.friendId } },
            );
            if (!user) {
                res.status(404).json({ message: 'User was not found'});
            } else {
                res.json({ message: 'friedn was delete'});
            };
        } catch (err) {
            console.log('Error', err);
            res.json(err);
        };
    },
};