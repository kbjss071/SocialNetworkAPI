// Require express router
const router = require('express').Router();

// Set requirements (from thoughts-controller)
const { 
    getAllThoughts, 
    getSingleThought, 
    createThought, 
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

} = require('../../controllers/thoughtController');

// Directs to: /api/thoughts <GET>
router.route('/').get(getAllThoughts).post(createThought);

// Directs to: /api/thoughts/:id <GET, PUT, DELETE>
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought); 

// Directs to: /api/thoughts/:thoughtId/reactions <POST>
router.route('/:thoughtId/reactions').post(addReaction);

// Directs to: /api/thoughts/:thoughtId/reactionId <DELETE>
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;