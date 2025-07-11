const express=require("express")
const {StoreBooks,SinginAsAdmin,SingupAsAdmin,Updatebook,DeleteBook} =require("../controllers/adminController")
const {adminMiddleware}=require("../middleware/admin")
const {BookImage}=require("../middleware/upload")
const {BOOKIMAGE}=require("../config/cloudinary")
const router=express.Router();


router.post("/singup",SingupAsAdmin)
router.post("/login",SinginAsAdmin)
router.post('/bookimage',adminMiddleware,BOOKIMAGE.single('image'),BookImage)
router.post("/storebooks", adminMiddleware,StoreBooks)
router.put("/book-updated/:id",adminMiddleware,Updatebook);
router.delete("/book-delete/:id",adminMiddleware,DeleteBook)
module.exports=router