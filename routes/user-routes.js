const sequelize = require('../database/connection')

module.exports = function (app) {
  const jwt = require('jsonwebtoken')
  const User = require('../models/user')
  const multer = require('multer')
  const upload = multer({ storage: multer.memoryStorage() })
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
      return res
        .status(200)
        .json({ status: 'ok', token: token, role: user.role })
    } else {
      return res.status(401).json({ status: 'error', token: false })
    }
  })

  //register endpoint
  app.post('/register', upload.single('imagine'), async (req, res) => {
    try {
      if (req.file) {
        console.log(req.body)
        const user = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
          imagine: req.file.buffer.toString('base64'),
        })

        res.status(200).json({ status: 'ok' })
      } else {
        const user = await User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        })
        res.status(200).json({ status: 'ok' })
      }
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
      users.forEach((element) => {
        if (element.imagine) {
          element.imagine = element.imagine.toString('ascii')
        }
      })
      res.status(200).json(users)
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })

  //get user by id
  app.get('/getuser/:id', async (req, res) => {
    try {
      const users = await User.findByPk(req.params.id)
      if (users.imagine) {
        users.imagine = users.imagine.toString('ascii')
      }
      res.status(200).json(users)
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })

  app.get('/getusersimple/:id', async (req, res) => {
    try {
      const users = await sequelize.query(
        `SELECT id_user, firstName, lastName, email, role, createdAt from csm_suceava.users where id_user=${req.params.id}`
      )
      users.forEach((element) => {
        if (element.imagine) element.imagine = element.imagine.toString('ascii')
      })
      if (users[0].imagine) {
        users[0].imagine = users[0].imagine.toString('ascii')
      }
      res.status(200).json(users[0])
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })
  app.get('/getuserposts/:id', async (req, res) => {
    try {
      const users = await sequelize.query(
        `SELECT COUNT(*) numar from csm_suceava.users u, csm_suceava.posts p where id_user=${req.params.id} AND user_id=${req.params.id};`
      )
      res.status(200).json(users[0][0].numar)
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })

  app.get('/getuserphoto/:id', async (req, res) => {
    try {
      const users = await User.findByPk(req.params.id)
      if (users.imagine) {
        users.imagine = users.imagine.toString('ascii')
        res.status(200).json(users.imagine)
      } else {
        res.status(200).json(users.imagine)
      }
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  //edit user
  app.put('/edituser/:id', upload.single('imagine'), async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
      if (req.file) {
        const users = await User.update(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            role: req.body.role,
            imagine: req.file.buffer.toString('base64'),
          },
          {
            where: { id_user: req.params.id },
          }
        )
        res.status(200).json({ status: 'ok' })
      } else {
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
      }
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
}
