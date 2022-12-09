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
    
}