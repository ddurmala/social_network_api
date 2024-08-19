const { User, Thought } = require('../models');

module.exports = {
    async registerUser(req, res) {
        try {
            const user = await User.create(req.body);

            res.json({
                user: user
            })
        } catch (error) {
            console.log('register error', error);

            if (error.code === 11000) {
                res.status(403).json({
                    message: 'that email address was already registered'
                })
            }
        }
    },

    async loginUser(req, res) {
        const user = await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.status(403).json({
                message: 'a user with that email cannot be found'
            });
        }

        res.json({
            user: user
        })
    },

    async getSingleUser(req, res) {
        const user = await User.findById(req.params.user_id).populate('thoughts');

        res.json(user);
    },

    async getAllUsers(req, res) {
        const users = await User.find().populate('thoughts');

        res.json(users);
    },

    async deleteUser(req, res) {
        const user = await User.findById(req.params.user_id);

        await user.deleteOne();
        res.json({
            message: 'user deleted'
        });
    }
}
