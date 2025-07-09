// login ,singup,deleteAccount, buy books that is in the routes 
const express=require('express');
const {Register,LoginAccount}=require("../controllers/userController")
const router=express.Router();

router.post('/singup',Register)
router.post('/singin',LoginAccount)

module.exports=router;