const express = require ('express');


const {sequelize, User, Post} = require('./models');
const { where } = require('sequelize');
const user = require('./models/user');





const app = express()
app.use(express.json())

app.post('/users', async(req, res)=>{
    const{name,email,role} = req.body

    try {
        const user = await User.create({name, email,role})
          
        return res.json(user)
    } catch (err) {
        return res.status(500).json(err)
    }
});

app.get('/users', async (req, res)=>{
    try {
        const users = await User.findAll()

        return res.json(users)
    } catch (error) {
        console.log(err);
        return res.status(500).json({error: 'opps! no vex . something went wrong'})
    }
});

app.get('/users/:uuid', async (req, res)=>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({
            where :{uuid},
            include : 'posts'
        })

        return res.json(user)

    } catch (error) {
        console.log(err);
        return res.status(500).json({error: 'opps! no vex . something went wrong'})
    }
});

app.post('/posts', async (req, res)=>{
    const {userUuid,body} = req.body

    try {
        const users = await User.findOne({where : {uuid : userUuid }})
        const post = await Post.create ({body, userId: user.id})

        return res.json(post)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
});


app.get('/posts', async (req, res)=>{
    try {
        const users = await User.findAll({include : ['user'] })

        return res.json(posts)
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
});

app.delete('/users/:uuid', async (req, res)=>{
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({where :{uuid}})
        await user.destroy()

        return res.json({ message: 'User deleted successfully'})

    } catch (error) {
        console.log(err);
        return res.status(500).json({error: 'opps! no vex . something went wrong'})
    }
});

app.put('/users/:uuid', async (req, res)=>{
    const uuid = req.params.uuid
    const {name, email, role} = req.body
    try {
        const user = await User.findOne({where :{uuid}})

          user.name = name
          user.email = email
          user.role = role

          await user.save()

        return res.json(user)

    } catch (error) {
        console.log(err);
        return res.status(500).json({error: 'opps! no vex . something went wrong'})
    }
});



app.listen({port:5050}, async ()=>{
    console.log(`server running on http://localhost:5050`)
    await sequelize.authenticate()
    console.log('Database connected!')
});