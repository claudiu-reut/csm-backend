module.exports=function(app){
    const Match = require('../models/match')
    //add match endpoint
    const sequelize = require('../database/connection')
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
        sets: req.body.sets,
      })
  
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      console.log(err);
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
    console.log('getmatches')
    try {
      const matches = await sequelize.query(
        'SELECT id_meci,data, campionat,divizia,sets, locatia, gen, description, rezultat, id_echipa1,id_echipa2, t1.nume nume1, t2.nume nume2 FROM csm_suceava.teams t1, csm_suceava.teams t2, csm_suceava.matches m WHERE m.id_echipa1=t1.id_echipa and m.id_echipa2=t2.id_echipa'
      )
      res.status(200).json(matches[0])
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })
  //get matches with teams logos
  app.get('/getmatchlogos/:id', async (req, res) => {
    console.log('getmatches')
    try {
      const matches = await sequelize.query(
        `SELECT id_meci,data, campionat,divizia,sets, locatia, gen, description, rezultat, id_echipa1,id_echipa2, t1.nume nume1, t2.nume nume2 FROM csm_suceava.teams t1, csm_suceava.teams t2, csm_suceava.matches m WHERE m.id_echipa1=t1.id_echipa and m.id_echipa2=t2.id_echipa and id_meci=${req.params.id}`
      )
      res.status(200).json(matches[0][0])
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })

  app.delete('/deletematch/:id', async (req, res) => {
    try {
      const id = req.params.id
      const temp = Match.destroy({
        where: { id_meci: id },
      })
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  app.put('/editmatch/:id', async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
      const matches = await Match.update(
        {
            data: req.body.data,
            campionat: req.body.campionat,
            rezultat: req.body.rezultat,
            id_echipa1: req.body.id_echipa1,
            id_echipa2: req.body.id_echipa2,
            locatia: req.body.locatia,
            description: req.body.description,
            gen: req.body.gen,
            divizia: req.body.divizia,
            sets: req.body.sets,
        },
        {
          where: { id_meci: req.params.id },
        }
      )
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })

}