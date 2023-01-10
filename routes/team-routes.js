module.exports=function(app){
    const multer = require('multer')
    const upload = multer({ storage: multer.memoryStorage() })
    const Team = require('../models/team')
    const Match = require('../models/match')
    const sequelize = require('../database/connection')
    Team.hasMany(Match, { as: 'matches1', foreignKey: 'id_echipa1' })
    Team.hasMany(Match, { as: 'matches2', foreignKey: 'id_echipa2' })
    //add team endpoint
app.post('/addteam', upload.single('imagine'), async (req, res) => {
    try {
      
      
      const team = await Team.create({
        tara: req.body.tara,
        oras: req.body.oras,
        nume: req.body.nume,
        imagine: req.file.buffer.toString('base64'),
      })
  
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      console.log(req.body);
      res.status(400).json({ status: 'error', err: err })
    }
  })
  
  //get teams endpoint
  app.get('/getsimpleteams', async (req, res) => {
    try {
      const teams = await sequelize.query("SELECT id_echipa,nume, oras, tara from csm_suceava.teams")
      res.status(200).json(teams[0])
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  //get teams without logos
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

  app.get('/getteamlogo/:id', async (req, res) => {
    try {
      const logo = await Team.findByPk(req.params.id)
      res.status(200).json(logo.imagine.toString("ascii"))
      
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  
  
}