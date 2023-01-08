const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const cors = require('cors')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const multer = require('multer')
//db conn
require('./database/connection')

const upload = multer({ storage: multer.memoryStorage() })

require('./bootstrap')()
const User = require('./models/user')
const Sponsor = require('./models/sponsors')
const Post = require('./models/post')
const sequelize = require('./database/connection')
const Team = require('./models/team')
const Match = require('./models/match')
const Personal = require('./models/personal')
User.hasMany(Post, { as: 'posts', foreignKey: 'user_id' })
Post.belongsTo(User, { as: 'posts', foreignKey: 'user_id' })
const errHandler = (err) => {
  console.error('Error: ', err)
}
Team.hasMany(Match, { as: 'matches1', foreignKey: 'id_echipa1' })
Team.hasMany(Match, { as: 'matches2', foreignKey: 'id_echipa2' })
Match.belongsTo(Post, { as: 'matches1', foreignKey: 'id_echipa1' })
Match.belongsTo(Post, { as: 'matches2', foreignKey: 'id_echipa2' })
Team.hasMany(Personal, { as: 'personal', foreignKey: 'id_echipa' })
Personal.belongsTo(Team, { as: 'personal', foreignKey: 'id_echipa' })
dotenv.config()
const router = express.Router()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/', router)
app.listen(5000, () => console.log('Server Running on port 5000'))
const contactEmail = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com', // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  tls: {
    ciphers: 'SSLv3',
  },
})

contactEmail.verify((error) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Ready to Send')
  }
})

router.post('/contact', (req, res) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.message

  const mail = {
    from: name,
    to: 'csmsuceava@outlook.com',
    subject: `Mesaj nou de la ${name}`,
    html: `<div style="font - family: system-ui; max-width:500px; margin-left">
    <h3>Ati primit un nou mesaj:</h3>
    <p><b>Nume</b>: ${name}</p>
    <p><b>Email</b>: ${email}</p>
    <p><b>Mesaj</b>: ${message}</p>
    </div>`,
  }
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: 'ERROR' })
    } else {
      res.json({ status: 'Mesaj trimis cu succes' })
    }
  })
})

///USERI
//login endpoint
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

///SPONSORI
//create sponsors endpoint
app.post('/createsponsor', async (req, res) => {
  try {
    console.log(req.body)
    const sponsor = await Sponsor.create({
      denumire: req.body.denumire,
      linkSite: req.body.linkSite,
      editia: req.body.editia,
      linkImagine: req.body.linkImagine,
    })

    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//get sponsors endpoint
app.get('/getsponsors', async (req, res) => {
  try {
    const sponsors = await Sponsor.findAll()
    res.status(200).json(sponsors)
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//deletesponsor
app.delete('/deletesponsor/:id', async (req, res) => {
  try {
    const id = req.params.id
    const temp = Sponsor.destroy({
      where: { id_sponsor: id },
    })
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})
//get sponsor by id
app.get('/getsponsor/:id', async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id)
    res.status(200).json(sponsor)
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//update sponsor by id
app.put('/editsponsor/:id', async (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  try {
    const sponsors = await Sponsor.update(
      {
        denumire: req.body.denumire,
        linkSite: req.body.linkSite,
        editia: req.body.editia,
        linkImagine: req.body.linkImagine,
      },
      {
        where: { id_sponsor: req.params.id },
      }
    )
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

///add post endpoint
app.post('/addpost', async (req, res) => {
  try {
    console.log(req.body)
    const post = await Post.create({
      titlu: req.body.titlu,
      descriere: req.body.descriere,
      tags: req.body.tags,
      data: req.body.data,
      linkExtern: req.body.linkExtern,
      linkImg: req.body.linkImg,
      user_id: req.body.user_id,
    })

    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

///get posts endpoint
app.get('/getposts', async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.status(200).json(posts)
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})
/// get posts with email
app.get('/getpostsuser', async (req, res) => {
  try {
    const posts = await sequelize.query(
      'SELECT id_postare, titlu, tags, user_id, linkImg, email, firstName, lastName, p.createdAt FROM POSTS P, USERS U WHERE U.ID_USER=P.USER_ID'
    )
    res.status(200).json(posts[0])
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})
///delete post by id
app.delete('/deletepost/:id', async (req, res) => {
  try {
    const id = req.params.id
    const temp = Post.destroy({
      where: { id_postare: id },
    })
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

///get post by id
app.get('/getpost/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//update post by id
app.put('/editpost/:id', async (req, res) => {
  console.log(req.body)
  console.log(req.params.id)
  try {
    const post = await Post.update(
      {
        titlu: req.body.titlu,
        descriere: req.body.descriere,
        tags: req.body.tags,
        linkImg: req.body.linkImg,
        user_id: req.body.user_id,
      },
      {
        where: { id_postare: req.params.id },
      }
    )
    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//add team endpoint
app.post('/addteam', upload.single('imagine'), async (req, res) => {
  try {
    console.log(req.file.buffer.toString('base64'))
    const team = await Team.create({
      tara: req.body.tara,
      oras: req.body.oras,
      nume: req.body.nume,
      imagine: req.file.buffer.toString('base64'),
    })

    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//get teams endpoint
app.get('/getteams', async (req, res) => {
  try {
    const teams = await Team.findAll()
    res.status(200).json(teams)
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})
///get team by id
app.get('/getteam/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id)
    res.status(200).json(team)
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//add match endpoint
app.post('/addmatch', async (req, res) => {
  try {
    console.log(req.body)
    const post = await Match.create({
      data: req.body.data,
      campionat: req.body.campionat,
      rezultat: req.body.rezultat,
      id_echipa1: req.body.id_echipa1,
      id_echipa2: req.body.id_echipa2,
      locatia: req.body.locatia,
      description: req.body.description,
      gen: req.body.gen,
      divizia: req.body.divizia,
    })

    res.status(200).json({ status: 'ok' })
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})
//get matches
app.get('/getmatches', async (req, res) => {
  try {
    const matches = await Match.findAll()
    res.status(200).json(matches)
  } catch (err) {
    res.status(400).json({ status: 'error', err: err })
  }
})

//get matches with teams logos
app.get('/getmatchlogos', async (req, res) => {
  try {
    const matches = await sequelize.query(
      'SELECT id_meci,data, campionat,divizia,sets, locatia, gen, description, rezultat, t1.nume nume1, t1.imagine img1, t2.nume nume2, t2.imagine img2 FROM csm_suceava.teams t1, csm_suceava.teams t2, csm_suceava.matches m WHERE m.id_echipa1=t1.id_echipa and m.id_echipa2=t2.id_echipa'
    )
    res.status(200).json(matches[0])
  } catch (err) {
    console.log(err)
    res.status(400).json({ status: 'error', err: err })
  }
})
