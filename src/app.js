const express = require("express");
const path = require("path");
const hbs = require("hbs");
require("./db/cone");
const formodel = require("./model/schema");
const bcrypt = require("bcryptjs");

const port = process.env.PORT || 1000;
const app = express();
// console.log("__dirname............................", __dirname);
const routpublick = path.join(__dirname, "../public");
const rouviews = path.join(__dirname, "../templet/views");
const routhbs = path.join(__dirname, "../templet/partials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(routpublick));
app.set("views engine", "hbs");
app.set("views", rouviews);
// hbs.registerPartial(routhbs);
hbs.registerPartials(routhbs);
app.get("/", (req, res) => {
  res.render("index.hbs");
});
app.get("/Rejistration", (req, res) => {
  res.render("Rejistration.hbs");
});
app.get("/Login", (req, res) => {
  res.render("login.hbs");
});
app.post("/Rejistration", async (req, res) => {
  try {
    const password = req.body.Password;
    const cpasswor = req.body.RepeatPassword;
    if (password === cpasswor) {
      const userdata = new formodel({
        USERNAME: req.body.Username,
        PHONE: req.body.phone,
        YOURAGE: req.body.yourage,
        EMAILADDRESS: req.body.EmailAddress,
        PASSWORD: req.body.Password,
        REPEATPASSWORD: req.body.RepeatPassword,
      });
      console.log("the success part"+userdata);
      const token= await userdata.generatetoken()
      console.log("the token part"+token);
      const result = await userdata.save();
      res.status(200).render("index.hbs");
    } else {
      res.send("password is not match");
    }
  } catch (error) {
    res.status(404).send(error);
    console.log("somthing error");
  }
});

app.post("/Login", async (req, res) => {
  try {
    const email = req.body.EMAILADDRESS;
    const Password = req.body.Password;
    const userdata = await formodel.findOne({
      EMAILADDRESS: email,
    });
    
  const  ismach =await bcrypt.compare(Password,userdata.PASSWORD);
  const token= await userdata.generatetoken()
      console.log("the token part"+token);
  if(ismach){
    console.log(userdata);
    res.status(201).render("index.hbs")
  }else{
    res.send("envalid password")
  }
   

    // res.send(userdata);
  } catch (error) {
    res.status(400).send("login error");
  }
});



app.listen(port, () => {
  console.log("run ok");
});



// const jwt=require("jsonwebtoken");

// const creattokem=async()=>{
//   const kry=await jwt.sign({_id:"640dd2a61071e7d33d695d74"},"jgjjegejeoihjoioitijhepjhpjephjpejp");
//   console.log(kry)
//   const verfi=await jwt.verify(kry,"jgjjegejeoihjoioitijhepjhpjephjpejp");
//   console.log(verfi);
// }



// creattokem()