// BUILD YOUR SERVER HERE
const express = require('express');
const Member = require('./users/model.js');

//instance of express app
const server = express();

// global middleware
server.use(express.json());

//end points

// [post]
server.post('/api/users', async (req, res) => {
    try {
        const { id, name, bio } = req.body
        // console.log(id, name, bio)
        const newMember = await Member.insert({ id, name, bio})
        if (!name || !bio) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {res.status(201).json(newMember)}
    } catch(err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
});

// [get]
server.get('/api/users', async (req, res) => {
    try {
        const friend = await Member.find()
        res.json(friend)
    } catch (err) {
        res.status(500).json({message: "The users information could not be retrieved"})
    }
});
// [get]
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const friend = await Member.findById(id)
        if (!friend){
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else {
            res.status(200).json(friend)
        }
    } catch (err) {
        res.status(500).json({message: "The user information could not be retrieved" })
    }
});

// [delete]
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deleteMember = await Member.remove(req.params.id)
        if (!deleteMember) {
            res.status(404).json({ message: "The user with the specified ID does not exist"})
        } else {
            res.json(deleteMember)
        }    
    } catch (err) {
        res.status(500).json({ message: "The user could not be removed"})
    }
});
// [put]
server.put('/api/users/:id', async (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    console.log( name, bio)
    try {
        const updateMember = await Member.update(id, { name, bio})
        if (!name || !bio ){
            res.status(400).json({message: "Please provide name and bio for the user" })
        } else if (!updateMember){
            res.status(404).json({message: "The user with the specified ID does not exist" })
        } else {
            res.status(200).json(updateMember)
        }
    } catch (err) {
        res.status(500).json({message: "The user information could not be modified" })
    }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
