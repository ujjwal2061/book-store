// login ,singup,deleteAccount, buy books that is in the routes
const express = require("express");
const {
  Register,
  LoginAccount,
  UserInfo,
  StoreBooks,
  AddImage,
  BookById,
  AllbooksList,
  Uplodpdf,

} = require("../controllers/userController");
const { BOOKIMAGE,Pdf } = require("../config/cloudinary");
const { userMiddleware } = require("../middleware/user");

const router = express.Router();
// auth routing
router.post("/signup", Register);
router.post("/login", LoginAccount);
router.get("/my-details", userMiddleware, UserInfo);
// files upload for books
router.post("/bookimage", userMiddleware, BOOKIMAGE.single("file"), AddImage);
router.post("/bookpdf", userMiddleware, Pdf.single("file"), Uplodpdf);
// book store and id books
router.post("/book-store", userMiddleware, StoreBooks);
router.get("/books", AllbooksList);
router.get("/books/:id", BookById);
module.exports = router;
