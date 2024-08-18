const router = require('express').Router();

const { verify } = require('crypto');
const thoughts_controller = require('../controllers/thoughts_controller');
const user_controllers = require('../controllers/user_controllers');

const { User, Thought } = require('../models');

async function attachUserId(req, res, next) {
    const token = req.cookies.token;

    try {
        const data = await verify(token, process.env.JWT_SECRET);

        req.user_ = data.user_id;

        next();
    } catch {
        console.log('error', error)
    }
}

async function attachUser(req, res, next) {
    const user = await User.findById(req.user_id);

    req.user = user;

    next();
}

// Register a User
router.post('/register', user_controllers.registerUser);

// Login a User
router.post('/login', user_controllers.loginUser);

// POST route to create/add a thought
router.post('/thoughts', attachUser, thoughts_controller.createThought);

module.exports = router;