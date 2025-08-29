// user schema , book  Schema & admin schema
const mongoose=require("mongoose");

// user schema 
const userScheam =new mongoose.Schema({
    firstname:{type:String, required:true, unique:true },
    lastname:{type:String,},
    password:{type:String, required:true,},
    email:{  type:String,required:true, unique:true},
}, {timestamps: true} )

// books Schema
const bookSchema=new mongoose.Schema({
    author:{type:String,required:true},
    bookname:{type:String,require:true},
    description:{type:String ,required:true},
    image: { type: String },        
    pdfUrl:{type :String },
})

const user=mongoose.model("Users",userScheam);
const book=mongoose.model("Books",bookSchema);

module.exports={user ,book}