// login ,singup,deleteAccount, buy books that is in the routes 
const express=require('express');
const {Register,LoginAccount,PurchaseBook}=require("../controllers/userController")
const {userMiddleware}=require("../middleware/user")
const router=express.Router();

router.post('/singup',Register)
router.post('/singin',LoginAccount)
router.post("/purchasebook",userMiddleware,PurchaseBook)

module.exports=router;