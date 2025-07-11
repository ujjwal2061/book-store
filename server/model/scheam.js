// user schema , book  Schema & admin schema
const mongoose=require("mongoose");

// user schema 
const userScheam =new mongoose.Schema({
    username:{type:String, required:true, unique:true },
    password:{type:String, required:true,},
    email:{  type:String,required:true, unique:true},
}, {timestamps: true} )

// books Schema
const bookSchema=new mongoose.Schema({
    author:{type:String,required:true},
    bookname:{type:String,require:true},
    title:{ type:String,required:true,unique:true },
    description:{type:String ,required:true},
    image: { type: String },        
    price: { type: String }, 
    rating:{type:Number ,default:0} ,
    genre:{type:String }, 
    bookStoreId:{type:mongoose.Schema.Types.ObjectId,ref:'Admin'},
    createdId:{type:String}
})
// admin Schema
const adimSchema=new mongoose.Schema({
    firstName:{type:String,require:true},
    lastName:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true}
})
// purchase Schema
const purchaseSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    purchaseId:{type:mongoose.Schema.Types.ObjectId, ref:'Books'}
})
const user=mongoose.model("Users",userScheam);
const book=mongoose.model("Books",bookSchema);
const admin=mongoose.model('Admin',adimSchema);
const purchase=mongoose.model("Purchase",purchaseSchema)

module.exports={user ,book,admin,purchase}