const {z}= require ("zod");
const {admin,book} =require("../model/scheam")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")



const adminValidation=z.object({
    firstname:z.string().min(4,"Admin name must be leaste 4 characters"),
    lastname:z.string(),
    email:z.string(),
    password:z.string().min(6,'Password must be at leaste 6').regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Password must contain at least 1 letter, 1 number, and 1 special character")
    })
    
    const LoginadminValidation=z.object({
        email:z.string(),
        password:z.string(),
    })
exports.SingupAsAdmin=async(req ,res)=>{
    try{
        const adminSingup=adminValidation.parse(req.body);
        const isPresentAlready=await admin.findOne({email:adminSingup.email})
        if(isPresentAlready){
            return res.status(400).json({
                status:false,
                msg:"Admin already present"
            })
        }
        const hasspassword=await bcrypt.hash(adminSingup.password,10);
        const newAdminaccount=new admin({
            firstName:adminSingup.firstname,
            lastName:adminSingup.lastname,
            email:adminSingup.email,
            password:hasspassword
        })
        await newAdminaccount.save();
        res.status(201).json({
            status:true,
            message:"Acount create successfully"
        })
    }catch(err){
      console.log(err)
        res.status(400).json({
            status:false,
            message:err.errors?.[0]?.message || 'Someting went wrong'
        })
    }
}
// login as Admin
exports.SinginAsAdmin=async(req ,res)=>{
    try{
        const adminLogin=LoginadminValidation.parse(req.body);
         if (!adminLogin.success) {
          return res.status(403).json({ error: adminLogin.error.errors });
          }
        const isAccount=await admin.findOne({email:LoginadminValidation.email})
        if(!isAccount){
            return res.status(403).json({
                status:false,
                message: "Invalid credentials"
            })
        }

        const ispasswordmatch=await bcrypt.compare(
            adminLogin.password,
            isAccount.password);
           if(!ispasswordmatch){
            return res.status(404).json({
                status:false,
                message:"Incocrrect Password"
            })
        }
        const token=jwt.sign(
            {
                id:isAccount._id,
                email:isAccount.email,
                role:"admin"
            },
            process.env.JWT_ADMIN,{expiresIn:"172800000"}
        )
          res.status(200).json({
            status:true,
            token:token,
            message:"Admin Login successfully "
        })
    }catch(err){
        console.log(err.message)
        res.status(400).json({
            status:false,
            message:err.errors?.[0]?.message || 'Validaation error'
        })
    }
}

// see all books List
exports.AllbooksList=async(req,res)=>{
    try{

    }catch(err){

    }
}
// add book to Store
exports.StoreBooks=async(req,res)=>{
    try{
        const adminId=req.adminId
        const books=req.body;
        const {
            bookname,author,
            title,description,
            price,genre,image
           }=books;

           if(!books){
            return res.status(400).json({
                status:false,
                message:"Please fill all Filed "
            })
           }
           const checkbooksPresnt=await book.findOne({bookname:bookname});
           if(checkbooksPresnt){
            return res.status(400).json({
                status:false,
                message:"Book already presnt in store"
            })
           }
           // 
           const newbook=new book({
            author:author,
            bookname:bookname,
            title:title,
            description:description,
            price:price,
            image:image,
            genre:genre,
            createdId:adminId
           })
           await newbook.save();
           res.status(200).json({
            status:true,
            message:"Book successfully added to store"
           })
           console.log("Books list",newbook)
    }catch(err){
            console.log('Error at store',err)
            res.status(500).json({
            message:err.error|| "Something wrong "
        })
     }
}