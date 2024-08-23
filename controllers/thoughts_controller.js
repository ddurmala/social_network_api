const { User, Thought } = require('../models');

module.exports = {

    async createThought(req, res) {
        const user = await User.findById(req.params.user_id);

        const newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: user.username
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

    async updateThought(req, res) {
        const updatedThought = await Thought.findOneAndUpdate({ _id: req.params.thought_id }, req.body, { new: true });

        res.json({
            message: 'thought updated',
            thought: updatedThought
        })
    },

    async createReaction(req, res) {
        const thought = await Thought.findById(req.params.thought_id);

        thought.reactions.push(req.body);
        await thought.save();

        res.json(thought)
    },

    async deleteReaction(req, res) {
        // const thought = await Thought.findById(req.params.thought_id);

        // thought.reactions.pull(req.params.reaction_id);

        // await thought.save();

        const thought = await Thought.updateOne(
            {
                _id: req.params.thought_id
            },
            {
                $pull: {
                    reactions: {
                        reactionId: req.params.reaction_id
                    }
                }
            }
        )

        res.json(thought)
    },

    async deleteThought(req, res) {
        const thought = await Thought.findById(req.params.thought_id);

        await thought.deleteOne();

        res.json({
            message: 'thought deleted'
        })
    }
}