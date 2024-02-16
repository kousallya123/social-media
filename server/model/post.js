const mongoose=require('mongoose')

const postSchema=new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
    ref: 'user', 
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }],
    },{
        timestamps:true 
    })

module.exports=mongoose.model("post",postSchema)