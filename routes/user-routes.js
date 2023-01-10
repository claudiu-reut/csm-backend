module.exports=function(app){
    const jwt = require('jsonwebtoken')
    const User = require('../models/user')
    const errHandler = (err) => {
        console.error('Error: ', err)
      }
    app.post('/login', async (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    }).catch(errHandler)
    if (user) {
      const token = jwt.sign(
        {
          email: user.email,
          role: user.role,
          name: user.firstName,
          user_id: user.id_user,
        },
        'secret123'
      )
      return res.status(200).json({ status: 'ok', token: token, role: user.role })
    } else {
      return res.status(401).json({ status: 'error', token: false })
    }
  })
  
  //register endpoint
  app.post('/register', async (req, res) => {
    try {
      console.log(req.body)
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      })
  
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  //delete user endpoint
  app.delete('/deleteuser/:id', async (req, res) => {
    try {
      const id = req.params.id
      const temp = User.destroy({
        where: { id_user: id },
      })
  
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  
  //get all users
  app.get('/getusers', async (req, res) => {
    try {
      const users = await User.findAll()
      res.status(200).json(users)
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  //get user by id
  app.get('/getuser/:id', async (req, res) => {
    try {
      const users = await User.findByPk(req.params.id)
      res.status(200).json(users)
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  //edit user
  app.put('/edituser/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
      const users = await User.update(
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        },
        {
          where: { id_user: req.params.id },
        }
      )
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
}