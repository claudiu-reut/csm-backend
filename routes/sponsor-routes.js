module.exports=function(app){
  const multer = require('multer')
  const upload = multer({ storage: multer.memoryStorage() })
    const Sponsor = require('../models/sponsors')
    //create sponsors endpoint
app.post('/createsponsor',upload.single('imagine'), async (req, res) => {
    try {
      console.log(req.body)
      const sponsor = await Sponsor.create({
        denumire: req.body.denumire,
        linkSite: req.body.linkSite,
        editia: req.body.editia,
        imagine:req.file.buffer.toString('base64')
      })
  
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: 'error', err: err })
    }
  })
  
  //get sponsors endpoint
  app.get('/getsponsors', async (req, res) => {
    try {
      const sponsors = await Sponsor.findAll()
      sponsors.forEach(element => {
        element.imagine=element.imagine.toString('ascii');
      });
      res.status(200).json(sponsors)
    } catch (err) {
      console.log(err);
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
      sponsor.imagine=sponsor.imagine.toString('ascii');
      res.status(200).json(sponsor)
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  
  //update sponsor by id
  app.put('/editsponsor/:id',upload.single('imagine'), async (req, res) => {
    console.log(req.body)
    console.log(req.params.id)
    try {
      if(req.file){
      const sponsors = await Sponsor.update(
        {
          denumire: req.body.denumire,
          linkSite: req.body.linkSite,
          editia: req.body.editia,
          
          imagine:req.file.buffer.toString('base64')
        },
        {
          where: { id_sponsor: req.params.id },
        }
      )
      }else
      {
        const sponsors = await Sponsor.update(
          {
            denumire: req.body.denumire,
            linkSite: req.body.linkSite,
            editia: req.body.editia,
            
          },
          {
            where: { id_sponsor: req.params.id },
          }
        )
      }
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
}