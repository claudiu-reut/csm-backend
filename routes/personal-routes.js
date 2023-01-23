module.exports=function(app){
    const Personal=require('../models/personal');
    const multer = require('multer')
    const upload = multer({ storage: multer.memoryStorage() })
    app.post('/addpersonal', upload.single('imagine'), async (req, res) => {
        try {
          
          
          const personal = await Personal.create({
           nume:req.body.nume,
           prenume:req.body.prenume,
           data_nasterii:req.body.data_nasterii,
           descriere:req.body.descriere,
           nationalitate:req.body.nationalitate,
           post:req.body.post,
           lot_curent:req.body.lot_curent,
           id_echipa:req.body.id_echipa,
           tip_personal:req.body.tip_personal,
           inaltime:req.body.inaltime,
           imagine: req.file.buffer.toString('base64'),
          })
      
          res.status(200).json({ status: 'ok' })
        } catch (err) {
          console.log(err);
          res.status(400).json({ status: 'error', err: err })
        }
      })

      app.get('/getsimplepersonal', async (req, res) => {
        try {
          const personal = await sequelize.query("SELECT id_personal,p.nume,prenume,descriere,nationalitate,post, lot_curent,p.id_echipa,tip_personal,inaltime,data_nasterii,t.nume nume_echipa from csm_suceava.personal p, csm_suceava.teams t WHERE t.id_echipa=p.id_echipa;")
          res.status(200).json(personal[0])
        } catch (err) {
          res.status(400).json({ status: 'error', err: err })
        }
      })
      app.get('/getpersonal', async (req, res) => {
        try {
          const personal = await Personal.findAll()
          personal.forEach(element => {
            element.imagine=element.imagine.toString("ascii");
          });
          res.status(200).json(personal)
        } catch (err) {
          res.status(400).json({ status: 'error', err: err })
        }
      })
      app.get('/getpersonal/:id', async (req, res) => {
        try {
          const personal = await Personal.findByPk(req.params.id)
          personal.imagine=personal.imagine.toString('ascii');
          res.status(200).json(personal)
        } catch (err) {
          res.status(400).json({ status: 'error', err: err })
        }
      })
      app.get('/getpersonalphoto/:id', async (req, res) => {
        try {
          const photo = await Personal.findByPk(req.params.id)
          res.status(200).json(photo.imagine.toString("ascii"))
          
        } catch (err) {
          res.status(400).json({ status: 'error', err: err })
        }
      })


      app.put('/editpersonal/:id',upload.single('imagine'), async (req, res) => {
        console.log(req.body)
        console.log(req.params.id)
        try {
          if(req.file){
          const personal = await Personal.update(
            {
              nume:req.body.nume,
           prenume:req.body.prenume,
           data_nasterii:req.body.data_nasterii,
           descriere:req.body.descriere,
           nationalitate:req.body.nationalitate,
           post:req.body.post,
           lot_curent:req.body.lot_curent,
           id_echipa:req.body.id_echipa,
           tip_personal:req.body.tip_personal,
           inaltime:req.body.inaltime,
           imagine: req.file.buffer.toString('base64')
            },
            {
              where: { id_personal: req.params.id },
            }
          )}
          else{
            const post = await Personal.update(
              {
                nume:req.body.nume,
                prenume:req.body.prenume,
                data_nasterii:req.body.data_nasterii,
                descriere:req.body.descriere,
                nationalitate:req.body.nationalitate,
                post:req.body.post,
                lot_curent:req.body.lot_curent,
                id_echipa:req.body.id_echipa,
                tip_personal:req.body.tip_personal,
                inaltime:req.body.inaltime,
                
              },
              {
                where: { id_personal: req.params.id },
              }
            )
          }
    
          res.status(200).json({ status: 'ok' })
        } catch (err) {
          res.status(400).json({ status: 'error', err: err })
        }
      })
      app.delete('/deletepersonal/:id', async (req, res) => {
        try {
          const id = req.params.id
          const temp = Personal.destroy({
            where: { id_personal: id },
          })
          res.status(200).json({ status: 'ok' })
        } catch (err) {
          res.status(400).json({ status: 'error', err: err })
        }
      })
}