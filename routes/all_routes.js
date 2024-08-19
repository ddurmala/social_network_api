const router = require('express').Router();

const thoughts_controller = require('../controllers/thoughts_controller');

const user_controller = require('../controllers/user_controller');

//USER ROUTES:
// Register a User
router.post('/register', user_controller.registerUser);

// Login a User
router.post('/login', user_controller.loginUser);

//GET all users
router.get('/users', user_controller.getAllUsers)

//GET route to retrieve a single user & associated thoughts
router.get('/user/:user_id', user_controller.getSingleUser)

//PUT to update a user by its _id

//DELETE to remove user by its _id
router.delete('/user/:user_id', user_controller.deleteUser)

// /api/users/:user_id/friends/:friend_id
// POST to add a new friend to a user's friend list


// DELETE to remove a friend from a user's friend list

//THOUGHT ROUTES:
//GET all thoughts
router.get('/thoughts', thoughts_controller.getAllThoughts)

// GET a single thought by id
router.get('/thought/:thought_id', thoughts_controller.getSingleThought)

// POST route to create/add a thought
router.post('/thoughts/:user_id', thoughts_controller.createThought);

//PUT to update a thought by its _id

//DELETE to remove a thought by _id
router.delete('/thought/:thought_id', thoughts_controller.deleteThought)

// /api/thoughts/:thought_id/reactions
//POST to create a reaction stored in a single thought's reactions array field

//DELETE to pull and remove a reaction by the reaction's reaction_id/reactionId value

module.exports = router;
