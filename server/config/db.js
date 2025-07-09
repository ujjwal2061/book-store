// databse connection 
const mongoose=require("mongoose");
require('dotenv').config();
const connectiondb=async()=>{
    try{
    await mongoose.connect(process.env.DATABASE_URL)
    console.log(" MongoDB Connected");
    }catch(err){
        console.log("Error at Connection bd",err)
    }
}
module.exports=connectiondb;