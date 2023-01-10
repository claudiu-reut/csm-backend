module.exports=function(app){
    const Post = require('../models/post')    
    const User = require('../models/user')
    const sequelize = require('../database/connection')
    User.hasMany(Post, { as: 'posts', foreignKey: 'user_id' })
Post.belongsTo(User, { as: 'posts', foreignKey: 'user_id' })
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
  

}