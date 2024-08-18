const { User } = require('../models');
const { sign, verify } = require('jsonwebtoken');

async function createToken(user_id) {
    const token = await sign({ user_id: user_id }, process.env.JWT_SECRET);

    return token;
}

module.exports = {
    async registerUser(req, res) {
        try {
            const user = await User.create(req.body);

            const token = await createToken(user._id);

            res.cookie('token', token)

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

        const token = await createToken(user._id);

        res.cookie('token', token)

        res.json({
            user: user
        })
    }
}