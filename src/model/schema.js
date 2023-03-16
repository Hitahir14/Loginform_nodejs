const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken")

const formashema = new mongoose.Schema({
  USERNAME: {
    type: String,
    required: true,
  },
  PHONE: {
    type: Number,
    required: true,
    unique: true,
  },
  YOURAGE: {
    type: Number,
    required: true,
  },
  EMAILADDRESS: {
    type: String,
    required: true,
    unique: true,
  },
  PASSWORD: {
    type: String,
    required: true,
    unique: true,
  },
  REPEATPASSWORD: {
    type: String,
    required: true,
  },
  tokens:[{
    token:{
      type:String,
      required:true,
    }
  }]
});
formashema.methods.generatetoken= async function(){
try { 
  console.log(this._id);
  const token= jwt.sign({_id:this._id},"mynameishitershnagheraaresameworkthe");
  this.tokens=this.tokens.concat({token:token})
  await this.save();
  return token;
  // console.log(token);
  
} catch (error) {
  console.log(`the error part ${error}`);
}
}


formashema.pre("save",async function(next){
  if(this.isModified("PASSWORD")){

    this.PASSWORD= await bcrypt.hash(this.PASSWORD,10);
    this.REPEATPASSWORD= await bcrypt.hash(this.REPEATPASSWORD,10);
  }

  next()
  // this.REPEATPASSWORD=undefined
})

const formodel = new mongoose.model("formodel", formashema);

module.exports = formodel;
