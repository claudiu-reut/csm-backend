module.exports = function (app) {
  const multer = require('multer')
  const upload = multer({ storage: multer.memoryStorage() })
  const Post = require('../models/post')
  const User = require('../models/user')
  const sequelize = require('../database/connection')
  User.hasMany(Post, { as: 'posts', foreignKey: 'user_id' })
  Post.belongsTo(User, { as: 'posts', foreignKey: 'user_id' })
  ///add post endpoint
  app.post('/addpost', upload.single('imagine'), async (req, res) => {
    try {
      console.log(req.body)
      const post = await Post.create({
        titlu: req.body.titlu,
        descriere: req.body.descriere,
        tags: req.body.tags,
        data: req.body.data,
        linkExtern: req.body.linkExtern,
        user_id: req.body.user_id,
        imagine: req.file.buffer.toString('base64'),
      })
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })

  ///get posts endpoint
  app.get('/getposts', async (req, res) => {
    try {
      const posts = await Post.findAll()
      posts.forEach((element) => {
        element.imagine = element.imagine.toString('ascii')
      })
      res.status(200).json(posts)
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })
  /// get posts with email
  app.get('/getpostsuser', async (req, res) => {
    try {
      const posts = await sequelize.query(
        'SELECT id_postare, titlu, tags, user_id, linkImg, email, firstName, lastName, p.imagine ,p.createdAt FROM POSTS P, USERS U WHERE U.ID_USER=P.USER_ID'
      )
      posts[0].forEach((element) => {
        if (element.imagine) element.imagine = element.imagine.toString('ascii')
      })

      res.status(200).json(posts[0])
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })
  ///delete post by id
  app.delete('/deletepost/:id', async (req, res) => {
    try {
      const temp = Post.destroy({
        where: { id_postare: req.params.id },
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
      post.imagine = post.imagine.toString('ascii')
      console.log(post.imagine)
      res.status(200).json(post)
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })

  //update post by id
  app.put('/editpost/:id', upload.single('imagine'), async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
      if (req.file) {
        const post = await Post.update(
          {
            titlu: req.body.titlu,
            descriere: req.body.descriere,
            tags: req.body.tags,
            user_id: req.body.user_id,
            imagine: req.file.buffer.toString('base64'),
          },
          {
            where: { id_postare: req.params.id },
          }
        )
      } else {
        const post = await Post.update(
          {
            titlu: req.body.titlu,
            descriere: req.body.descriere,
            tags: req.body.tags,
            user_id: req.body.user_id,
          },
          {
            where: { id_postare: req.params.id },
          }
        )
      }

      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
}
