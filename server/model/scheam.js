// user scheam and book  scheam 
const mongoose=require("mongoose");

// user scheam 
const userScheam =new mongoose.Schema({
    username:{type:String, required:true, unique:true },
    password:{type:String, required:true,},
    email:{  type:String,required:true, unique:true},
    purchasebooks:[{ 
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Books",}]
}, {timestamps: true} )

// books Scheam
const bookSchema=new mongoose.Schema({
    author:{type:String,required:true},
    title:{ type:String,required:true,unique:true },
    description:{type:String ,required:true},
    image: { type: String },        
    price: { type: Number }, 
    rating:{type:Number ,default:0} ,
    genre:{type:String } 
})

const user=mongoose.model("Users",userScheam);
const book=mongoose.model("Books",bookSchema);

module.exports={user ,book}