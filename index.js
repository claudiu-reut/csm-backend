const express=require("express");
const bodyParser =require( "body-parser");
const  Sequelize =require("sequelize");
const cors =require("cors");
const nodemailer =require ("nodemailer")
const dotenv =require ("dotenv");
const jwt=require("jsonwebtoken");

//db conn
require("./database/connection");

require("./bootstrap")();
const User=require("./models/user");
const Sponsor=require("./models/sponsors");

const errHandler= (err)=>{
    console.error("Error: ",err);
}


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


//login endpoint
app.post("/api/login", async (req, res) => {
  console.log(req.body.email);
  console.log(req.body.password);
  const user = await User.findOne({where:{
    email: req.body.email,
    password: req.body.password,
  }}).catch(errHandler);
  if (user) {
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
      },
      "secret123"
    );
    return res.json({status: "ok", user: token});
  } else {
    return res.json({status: "error", user: false});
  }
});

//register endpoint
app.post("/api/register", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });

    res.json({status: "ok"});
  } catch (err) {
    res.json({status: "error", err: err});
  }
});