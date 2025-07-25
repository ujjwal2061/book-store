// login ,singup,deleteAccount, buy books that is in the routes 
const express=require('express');
const {Register,LoginAccount,PurchaseBook,Getbooks,UserInfo}=require("../controllers/userController")
const {userMiddleware}=require("../middleware/user")
const router=express.Router();

router.post('/signup',Register)
router.post('/login',LoginAccount)
router.post('/books-filter',Getbooks);
router.get('/my-details',userMiddleware,UserInfo);
router.post("/purchasebook",userMiddleware,PurchaseBook)

module.exports=router;