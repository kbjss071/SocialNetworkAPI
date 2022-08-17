const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports ={
    //create a new user
    createUser (req, res) {
        User.create(req.body)
            .then((user)=> res.json(user))
            .catch((err)=> res.status(500).json(err));
    },
    // get all users
    getUsers(req, res) {
        User.find()
        .then(async(users)=> {
            const userObj = {
                users,
                friendCount: await friendCount()
            }
            return res.json(userObj);
        })
        .catch((err)=>{
            console.log(err);
            return res.status(500).json(err);
        })
    },
    //get a single user
    getSingleUser(req, res){
        User.findOne({_id: req.params.userId})
            .select('-__v')
            .then(async (user)=>{
                if(!user){
                    res.status(404).json({message: 'No user with the ID'})
                } else {
                    res.json({user, friendCount: await friendCount()})
                }
            })
            .catch((err)=> {
                console.log(err);
                return res.status(500).json(err);
            })
    },
    //delete an user
    deleteUser(req, res){
        User.findOneAndRemove({_id: req.params.userId})
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No user found with the id'})
                : Thought.deleteMany({username: user.username})
        )
        .then((result)=> {
            res.status(200).json({message: "Successfully deleted the user"});
        })
        .catch((err) => {
            res.status(500).json(err)
        })
    },

    //update an user
    updateUser(req, res){
        User.findOneAndUpdate({_id: req.params.UserId}, req.body, {new: true})
        .then((user)=> {
            !user
                ? res.status(404).json({message: 'No user found with the id'})
                : res.json(user);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
    },

    // add friends to an user
    addFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId,},
            { $push: {friends: req.params.friendId}},
            {new: true}
        )
        .then((user)=>{
            !user
                ? res.status(404).json({message: "No user found with the id"})
                : res.json(user)
        })
        .catch((err)=> res.status(500).json(err));
    },

    // delete friends from an user
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $pull: {friends: req.params.friendId}}
        )
        .then((user)=>{
            !user
                ? res.status(404).json({message: "No user found with the id"})
                : res.json(user)
        })
        .catch((err)=>{
            res.status(500).json(err);
        })
    }

}