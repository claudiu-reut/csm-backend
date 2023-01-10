module.exports=function(app){
    const Sponsor = require('../models/sponsors')
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
}