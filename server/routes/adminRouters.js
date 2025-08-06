const express=require("express")
const {StoreBooks,SinginAsAdmin,SingupAsAdmin,Updatebook,DeleteBook, AllbooksList, BookById, AdminInfo, AddImage,GetBookByCreatedId} =require("../controllers/adminController")
const {adminMiddleware}=require("../middleware/admin")

const {BOOKIMAGE}=require("../config/cloudinary")
const router=express.Router();


router.post("/admin-singup",SingupAsAdmin)
router.post("/admin-login",SinginAsAdmin)
router.get("/admin-details",adminMiddleware,AdminInfo)
router.get("/dashbord",adminMiddleware,GetBookByCreatedId);
router.get("/books",adminMiddleware,AllbooksList);
router.post("/books/:id",adminMiddleware,BookById)
router.post('/bookimage',adminMiddleware,BOOKIMAGE.single('file'),AddImage)
router.post("/storebooks", adminMiddleware,StoreBooks)
router.put("/book-updated/:id",adminMiddleware,Updatebook);
router.delete("/book-delete/:id",adminMiddleware,DeleteBook)
module.exports=router