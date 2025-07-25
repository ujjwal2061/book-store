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
exports.SingupAsAdmin = async (req, res) => {
  try {
    const adminSingup = adminValidation.parse(req.body);
    const isPresentAlready = await admin.findOne({ email: adminSingup.email });
    if (isPresentAlready) {
      return res.status(400).json({
        status: false,
        msg: "Admin already present",
      });
    }
    const hasspassword = await bcrypt.hash(adminSingup.password, 10);
    const newAdminaccount = new admin({
      firstName: adminSingup.firstname,
      lastName: adminSingup.lastname,
      email: adminSingup.email,
      password: hasspassword,
    });
    await newAdminaccount.save();
    res.status(201).json({
      status: true,
      message: "Acount create successfully",
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: false,
      message: err.errors?.[0]?.message || "Someting went wrong",
    });
  }
};
// login as Admin
exports.SinginAsAdmin = async (req, res) => {
  try {
    const adminLogin = LoginadminValidation.parse(req.body);
    const isAccount = await admin.findOne({ email: adminLogin.email });
    if (!isAccount) {
      return res.status(403).json({
        status: false,
        message: "Invalid credentials",
      });
    }

    const ispasswordmatch = await bcrypt.compare(adminLogin.password, isAccount.password);
    if (!ispasswordmatch) {
      return res.status(404).json({
        status: false,
        message: "Incocrrect Password",
      });
    }
    const token = jwt.sign(
      {
        id: isAccount._id,
        email: isAccount.email,
        role: "admin",
      },
      process.env.JWT_ADMIN,
      { expiresIn: "172800000" }
    );
    res.status(200).json({
      status: true,
      token: token,
      message: "Admin Login successfully ",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err.message || "Validaation error",
    });
  }
};

// see all books List
// need to add the pageations and filter
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
// add book to Store
exports.StoreBooks = async (req, res) => {
  try {
    const adminId = req.adminId;
    const books = req.body;
    const { bookname, author, title, description, price, genre, image } = books;

    if (!books) {
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
      createdId: adminId,
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
// get book by Id
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
    console.log("Book Infromation ->", bookInfo);
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
// update books
exports.Updatebook=async(req,res)=>{
    try{
  const  bookId=req.params.id;
  const updateInfo=req.body;
  if(!bookId && !updateInfo){
     return res.status(400).json({
         status:false,
         message:"Book ID and update data are need"
     })
  }
  const updatedata=await book.findByIdAndUpdate(bookId,updateInfo,{new:true});
        if (!updatedata) {
            return res.status(404).json({
                status: false,
                message: "Book not found",
            });
        }
        res.status(200).json({
            status:true,
            message:"Book updated successfully",
            data:updatedata
        })
    }catch(err){
        res.status(500).json({
            status:false,
            message:"Smothing went wrong"
        })
    }
}
// delete books
exports.DeleteBook=async(req,res)=>{
    try{
        const {bookId}=req.params.id;
        const adminId=req.body;
        if(!adminId && !bookId){
            return res.status(403).json({
                status:false,
                message:"Admin Id is missing !"
            })
        }
        const deletedBook=await book.findOneAndDelete(
          bookId
        )
        res.status(200).json({
            status:true,
          message: `Book '${deletedBook.title}' deleted successfully.`,
          data:deletedBook
        })
    }catch(err){
        console.log(err)
      res.status(500).json({
            status:false,
            message:"Smothing went wrong"
        })  
    }
}