const jwt=require("jsonwebtoken");


function adminMiddleware(req,res,next){
    const token=req.headers.token;
    const decode=jwt.verify(token,process.env.JWT_ADMIN)
    if(decode){
        req.adminId=decode.id;
        next();
    }else{
        res.status(403).json({
            message:"Please Signin "
        })
    }
}


module.exports={
    adminMiddleware
}