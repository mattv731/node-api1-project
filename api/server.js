// BUILD YOUR SERVER HERE
const express = require('express');
const Member = require('./users/model.js');

//instance of express app
const server = express();

// global middleware
server.use(express.json())

//end points

// [post]
server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        // console.log(id, name, bio)
        const newMember = await Member.insert({ name, bio})
        console.log(newMember)
        res.status(201).json(newMember)
    } catch(err) {
        res.status(500).json({ message: + err.message })
    }
});

// [get]
server.get('/api/users', async (req, res) => {
    try {
        const friend = await Member.find()
        res.json(friend)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})
// [get]
server.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params
        console.log(id)
        const friend = await Member.findById(id)
        if (!friend){
            res.status(404).json({ message: 'no member'})
        } else {
            res.status(200).json(friend)
        }
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// [delete]
server.delete('/api/users/:id', async (req, res) => {
    try {
        const deleteMember = await Member.remove(req.params.id)
        if (!deleteMember) {
            res.status(404).json({ message: 'No member with that ID'})
        } else {
            res.json(deleteMember)
        }    
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})
// [put]
server.put('/api/users/:id')

module.exports = server; // EXPORT YOUR SERVER instead of {}
