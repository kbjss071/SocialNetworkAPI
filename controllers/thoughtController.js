const { User, Thought } = require('../models');

module.exports = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
        .then(thoughtData =>{
            res.status(200).json(thoughtData)
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    },

    getSingleThought(req, res) {
        Thought.findOne({_id: req.params.id})
        .then((thought) => 
            !thought
                ? res.status(404).json({message: "No thought found with the id"})
                : res.json(thought)
        )
        .catch((err)=>res.status(500).json(err))
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then((thought)=> {
                User.findOneAndUpdate(
                    {username: req.body.username},
                    {$push: {thoughts: thought._id}},
                    {new: true}
                )
                .then((user)=>{
                    !user
                        ? res.status(404).json({message: 'No user found with the id'})
                        : res.status(200).json(user)
                })
            })
            .catch((err)=>res.status(500).json(err));
    },

    updateThought(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            {new: true}
        )
        .then((thought)=> {
            !thought
                ? res.status(404).json({message: 'No thought found with the id'})
                : res.status(200).json(thought)
        })
        .catch((err)=> res.status(400).json(err))
    },
    
    deleteThought(req, res){
        Thought.findOneAndDelete({_id: req.params.id})
        .then((thought)=>{
            !thought
                ? res.status(404).json({message: 'No thought found with the id'})
                : res.status(200).json(thought)
        })
        .catch((err)=> res.status(500).json(err))
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$push: {reactions: req.body}},
            {new: true}
        )
        .then((thought)=> {
            !thought
                ? res.status(404).json({message: 'No thought found with the id'})
                : res.status(200).json(thought)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    },

    deleteReaction(req, res){
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {_id: req.params.reactionId}}},
            {new: true}
        )
        .then((reaction) => {
            !reaction
                ? res.status(404).json({message: "No reaction found with this id"})
                : res.json({message: 'Successfully deleted!'})
        }) 
        .catch((err)=> res.json(err))
    }
}