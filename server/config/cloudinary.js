const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} =require('multer-storage-cloudinary');
const multer=require('multer');

cloudinary.config({
    cloud_name:process.env.NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

// for the books image
const BookImages=new CloudinaryStorage({
    cloudinary:cloudinary,params:{
        folder:'bookstore/bookImages',
       allowed_formats: ['jpg', 'png', 'jpeg']
    }
})
// for userImage if need   later
const BOOKIMAGE=multer({BookImages});
module.exports={BOOKIMAGE};