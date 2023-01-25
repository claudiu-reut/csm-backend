module.exports = function (app) {
  const Personal = require('../models/personal')
  const multer = require('multer')
  const upload = multer({ storage: multer.memoryStorage() })
  app.post('/addpersonal', upload.single('imagine'), async (req, res) => {
    try {
      const personal = await Personal.create({
        nume: req.body.nume,
        prenume: req.body.prenume,
        data_nasterii: req.body.data_nasterii,
        descriere: req.body.descriere,
        post: req.body.post,
        lot_curent: req.body.lot_curent,
        id_echipa: req.body.id_echipa,
        tip_personal: req.body.tip_personal,
        inaltime: req.body.inaltime,
        gen: req.body.gen,
        imagine: req.file.buffer.toString('base64'),
      })

      res.status(200).json({ status: 'ok' })
    } catch (err) {
      console.log(req.body)
      res.status(400).json({ status: 'error', err: err })
    }
  })
  app.get('/getpersonal', async (req, res) => {
    try {
      const personal = await Personal.findAll()
      personal.forEach((element) => {
        element.imagine = element.imagine.toString('ascii')
      })
      res.status(200).json(personal)
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  app.get('/getpersonal/:id', async (req, res) => {
    try {
      const person = await Personal.findByPk(req.params.id)
      person.imagine = person.imagine.toString('ascii')
      res.status(200).json(person)
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
  app.put('/editpersonal/:id', upload.single('imagine'), async (req, res) => {
    console.log(req.body)
    try {
      if (req.file) {
        const personal = await Personal.update(
          {
            nume: req.body.nume,
            prenume: req.body.prenume,
            data_nasterii: req.body.data_nasterii,
            descriere: req.body.descriere,
            post: req.body.post,
            lot_curent: req.body.lot_curent,
            id_echipa: req.body.id_echipa,
            tip_personal: req.body.tip_personal,
            inaltime: req.body.inaltime,
            gen: req.body.gen,
            imagine: req.file.buffer.toString('base64'),
          },
          {
            where: { id_personal: req.params.id },
          }
        )
      } else {
        const personal = await Personal.update(
          {
            nume: req.body.nume,
            prenume: req.body.prenume,
            data_nasterii: req.body.data_nasterii,
            descriere: req.body.descriere,
            post: req.body.post,
            lot_curent: req.body.lot_curent,
            id_echipa: req.body.id_echipa,
            tip_personal: req.body.tip_personal,
            inaltime: req.body.inaltime,
            gen: req.body.gen,
          },
          {
            where: { id_personal: req.params.id },
          }
        )
      }
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      console.log(err)
      res.status(400).json({ status: 'error', err: err })
    }
  })
  app.delete('/deletepersonal/:id', async (req, res) => {
    try {
      const temp = Personal.destroy({
        where: { id_personal: req.params.id },
      })
      res.status(200).json({ status: 'ok' })
    } catch (err) {
      res.status(400).json({ status: 'error', err: err })
    }
  })
}
