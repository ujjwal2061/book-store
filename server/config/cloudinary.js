const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} =require('multer-storage-cloudinary');
const multer=require('multer');
const path=require("path");
require('dotenv').config()
cloudinary.config({
    cloud_name:process.env.NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});
// cloudinary.config({
//     cloud_name:"da0zslcf2",
//     api_key:"722948813749441",
//     api_secret:"9kmwFqgIgeKYJ6rBRcFmVSlNbnc"
// });
// for the books image
const BookImages = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bookstore/bookImages',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});
const bookpdf=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"books-pdf",
        allowed_formats:['pdf'],
        resource_type:"raw",
        public_id:(req,file)=>{
            return `pdf_${Date.now()}_${Math.round(Math.random() * 1E9)}`;
        }
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==="application/pdf"){
        cb(null ,true);;
    }else{
        cb(new Error('Only PDF  file are allowed') ,false);
    }
}
const Pdf=multer({storage:bookpdf,fileFilter:fileFilter});
const BOOKIMAGE=multer({ storage:BookImages});
module.exports={BOOKIMAGE,Pdf};