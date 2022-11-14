const express = require('express')
const app = express()
const mongoose = require('mongoose')
const UserModel = require('./models/Users')
const cors = require('cors')

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb+srv://admin:admin3256@cluster0.g6cb5qc.mongodb.net/contact?retryWrites=true&w=majority')

app.get('/getUsers', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err)
        } else {
            res.json(result)
        }
    })
})

app.post('/createUser', async (req, res) => {
    const user = req.body
    const newUser = new UserModel(user)
    await newUser.save()

    res.json(user)
})


app.put('/updateUser', async (req, res) => {
    const newName = req.body.newName
    const id = req.body.id

    try {
        await UserModel.findById(id, (err, updatedName) => {
            updatedName.name = newName
            updatedName.save()
            res.send('updated')
        })
    } catch (err) {
        console.log('err')
    }
})


app.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
    await UserModel.findByIdAndRemove(id).exec()
    res.send('deleted with success')
})

app.listen(3001, () => {
    console.log("hello")
})