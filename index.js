import express from "express";
import bodyParser from "body-parser";
import sequelize from "sequelize";
import cors from "cors";
import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config();
const router = express.Router();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));
const contactEmail = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    },
    tls: {
        ciphers:'SSLv3'
    }
});

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

router.post("/contact", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const mail = {
    from: name,
    to: "csmsuceava@outlook.com",
    subject: `Mesaj nou de la ${name}`,
    html: `<div style="font - family: system-ui; max-width:500px; margin-left">
    <h3>Ati primit un nou mesaj:</h3>
    <p><b>Nume</b>: ${name}</p>
    <p><b>Email</b>: ${email}</p>
    <p><b>Mesaj</b>: ${message}</p>
    </div>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERROR" });
    } else {
      res.json({ status: "Mesaj trimis cu succes" });
    }
  });
});