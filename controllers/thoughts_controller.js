const { User, Thought } = require('../models');

module.exports = {

    async createThought(req, res) {
        const user = await User.findById(req.params.user_id);

        const newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            createdAt: req.body.createdAt,
            username: user.username
            // reactions: req.body.reactions
        })

        user.thoughts.push(newThought._id);
        await user.save();

        res.json({
            message: 'new thought added!',
            thought: newThought
        })
    },
    async getAllThoughts(req, res) {
        const thoughts = await Thought.find().populate({
            path: 'username',
            select: 'email -_is -username'
        });
        res.json(thoughts)
    },
    async getSingleThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id);

        res.json(thought);
    },
    async deleteThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id);

        await thought.deleteOne();

        res.json({
            message: 'thought deleted'
        })
    }
}