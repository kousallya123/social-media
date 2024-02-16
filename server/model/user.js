const mongoose=require('mongoose')

const User=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    profileImage:{type:String},
    password:{type:String,required:true},
   

}) 

module.exports=mongoose.model('user',User)