const express=require("express")
const {StoreBooks,SinginAsAdmin,SingupAsAdmin} =require("../controllers/adminController")
const {adminMiddleware}=require("../middleware/admin")
const router=express.Router();


router.post("/singup",SingupAsAdmin)
router.post("/login",SinginAsAdmin)
router.post("/storebooks", adminMiddleware,StoreBooks)
module.exports=router