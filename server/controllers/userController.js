// login ,singup and deleteaccount  route there
const {z} =require('zod');
const bcrypt=require("bcrypt");
const { user } = require('../model/scheam');
const jwt=require('jsonwebtoken')

const SingupValidation=z.object({
    username:z.string().min(4,'Username must be leaste 4 characters'),
    email:z.string().email("Invlaid email"),
    password:z.string().min(6,'Password must be at leaste 6 characters')
    .regex( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
    "Password must contain at least 1 letter, 1 number, and 1 special character")
})
//Login Validation
const LoginValidation=z.object({
    email:z.string(),
    password:z.string(),
})
// User Registetr Logic
exports.Register=async(req,res)=>{
    try{
      const userSingup=SingupValidation.parse(req.body);
      // check the user is already Presnt or not
      const alreadyPresntUser=await user.findOne({email:userSingup.email})
      if(alreadyPresntUser){
        return res.status(403).json({
            status:false,
            message:"User already exits !"
        })
      }
      const haspassword=await bcrypt.hash(userSingup.password,10)
     //
     const newUseraccount=new user({
        username:userSingup.username,
        email:userSingup.email,
        password:haspassword
     }) 
     await  newUseraccount.save();
      res.status(201).json({
        status:true,
        message:"Account created successfully "
      })
    }catch(err){
        console.log(err)
        res.status(400).json({
            status:false,
            message:err.errors?.[0]?.message || 'Someting went wrong'
        })
    }
    
}
// User Login Logic 
exports.LoginAccount=async(req,res)=>{
    try{
        const userLogin=LoginValidation.parse(req.body);
        const isAccount=await user.findOne({email:userLogin.email})
        if(!isAccount){
             return res.status(409).json({
                status:false,
                message:"User doesn't exist !"
            })
        }
        const ispasswordmatch=await bcrypt.compare(userLogin.password,isAccount.password)
        if(!ispasswordmatch){
            return res.status(404).json({
                status:false,
                message:"Incocrrect Password"
            })
        }
        const token=jwt.sign({
            id:isAccount._id,
            email:isAccount.email,
        },
        process.env.JWT_USER,{expiresIn:"172800000"})
        res.status(200).json({
            status:true,
            token:token,
            message:"User Login successfully "
        },)
    }catch(err){
     console.log(err)
        res.status(400).json({
            status:false,
            message:err.errors?.[0]?.message || 'Validaation error'
        })
    }
}
// user buy Books 
exports.PurchaseBook=async(req,res)=>{
    try{
        const userId=req.userId
        
    }catch(err){

    }
}

