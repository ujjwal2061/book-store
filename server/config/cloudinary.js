const cloudinary = require('cloudinary').v2
const {CloudinaryStorage} =require('multer-storage-cloudinary');
const multer=require('multer');

// cloudinary.config({
//     cloud_name:process.env.NAME,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.API_SECRET
// });
cloudinary.config({
    cloud_name:"da0zslcf2",
    api_key:"722948813749441",
    api_secret:"9kmwFqgIgeKYJ6rBRcFmVSlNbnc"
});
// for the books image
const BookImages = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'bookstore/bookImages',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});

const BOOKIMAGE=multer({ storage:BookImages});
module.exports={BOOKIMAGE};