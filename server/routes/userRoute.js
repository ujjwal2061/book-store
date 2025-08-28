// login ,singup,deleteAccount, buy books that is in the routes 
const express=require('express');
const {Register,LoginAccount,Getbooks,UserInfo,StoreBooks,AddImage,BookById,AllbooksList}=require("../controllers/userController")
const {BOOKIMAGE} =require("../config/cloudinary")
const {userMiddleware}=require("../middleware/user");

const router=express.Router();

router.post('/signup',Register)
router.post('/login',LoginAccount)
router.get("/books",AllbooksList);
router.get('/my-details',userMiddleware,UserInfo);
router.post('/bookimage',userMiddleware,BOOKIMAGE.single('file'),AddImage)
router.post("/book-store",userMiddleware,StoreBooks)
router.post("/books/:id",BookById)
module.exports=router;