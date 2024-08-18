const { User, Thought } = require('../models');

module.exports = {
    async getSingleUser(req, res) {
        const user = await User.findById(req.user_id).populate('thoughts');

        res.json(user);
    },

    async createThought(req, res) {
        // if (!req.user) {
        //     return res.status(401).json({ message: 'User not authenticated' });
        // }

        const newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            createdAt: req.body.createdAt,
            username: req.user._id
            // reactions: req.body.reactions
        })

        req.user.thoughts.push(newThought._id);
        await req.user.save();

        res.json({
            message: 'new thought added!',
            thought: newThought
        })
    }
}