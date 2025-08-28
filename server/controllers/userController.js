// login ,singup and deleteaccount  route there
const {z} =require('zod');
const bcrypt=require("bcrypt");
const { user, book } = require('../model/scheam');
const jwt=require('jsonwebtoken')

const SingupValidation=z.object({
    firstname:z.string().min(4,'Username must be leaste 4 characters'),
    lastname:z.string(),
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
        firstname:userSingup.firstname,
        lastname:userSingup.lastname,
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
             return res.status(400).json({
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
        process.env.JWT_USER,{expiresIn:"2d"})
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
// get user Info
exports.UserInfo=async(req,res)=>{
    try{
 const userdb=await user.findById(req.userId);
 if(!userdb){
    return res.status(400).json({
        status:false,
        message:"User not exit's"
    })
 }
 const userInfoWithoutPassowrd={...userdb.toObject()};
 delete userInfoWithoutPassowrd.password;
  res.status(200).json({
    status:true,
     data:{
        data:userInfoWithoutPassowrd
     }
  })
    }catch(err){
        res.status(500).json({
            status:false,
            message:"Something Went Wrong"
        })
    }
}
//  find a book by the search 
exports.Getbooks=async(req,res)=>{
const searchItems=req.body;
    try{
        const  booknameSerach=String(searchItems.name || " ")
       const Items=await book.find({genre:{$regex:booknameSerach,$options:"i"}})
  if(!Items){
   return res.status(400).json({
    status:false,
    message:"Book is missing "
  })
 }
 res.status(200).json({
    status:true,
    message:'Got your book',
    data:{
        data: Items,
    }
})
    }catch(err){
        res.status(500).json({
            status:false,
            message:'Someting went wrong',
            errors:err
        }) 
    }
}
exports.StoreBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookname, author, title, description, price, genre, image } =req.body;

    if (!bookname || !author || !title || !description || !price || !genre) {
      return res.status(400).json({
        status: false,
        message: "Please fill all Filed ",
      });
    }
    const checkbooksPresnt = await book.findOne({ bookname: bookname });
    if (checkbooksPresnt) {
      return res.status(400).json({
        status: false,
        message: "Book already presnt in store",
      });
    }
    //
    const newbook = new book({
      author: author,
      bookname: bookname,
      title: title,
      description: description,
      price: price,
      image: image,
      genre: genre,
      rating:0|| "",
      createdId: userId,
    });
    await newbook.save();
    res.status(200).json({
      status: true,
      message: "Book successfully added to store",
    });
  } catch (err) {
    console.log("Error at store", err);
    res.status(500).json({
      message: err.error || "Something wrong ",
    });
  }
};
exports.AddImage=async(req,res)=>{
  try{
    if(!req.file){
      return res.status(400).json({
        status:false,
        message:"No file uploaded"
      })
    }
    const imageLink=req.file.path;
    res.json({link:imageLink})
  }catch(err){
    console.log(err)
     res.status(500).json({
        status: "Fail",
        msg: "Internal Server Error"
      });
  }
}
exports.BookById = async (req, res) => {
  const bookId = req.params.id;
  try {
    if (!bookId) {
      return res.status(400).json({
        status: false,
        message: "BookId is missing !",
      });
      //
    }
    const bookInfo = await book.findById(bookId);
    res.status(200).json({
      status: true,
      message: "Book Info ->",
      data: { bookInfo },
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong !",
    });
  }
};

exports.AllbooksList = async (req, res) => {
  try {
    const allbooksListed = await book.find({});
    res.status(200).json({
      status: true,
      message: "Booked listed",
      data: allbooksListed,
    });
  } catch (err) {
    res.status(500).json({
      message: err.error || "Something wrong ",
    });
  }
};
