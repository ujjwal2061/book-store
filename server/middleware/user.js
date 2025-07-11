const jwt=require("jsonwebtoken");


function userMiddleware(req,res,next){
    const token=req.headers.token;
    const decode=jwt.verify(token,process.env.JWT_USER)
    if(decode){
        req.userId=decode.id;
        next();
    }else{
        res.status(403).json({
            message:"Please Signin "
        })
    }
}


module.exports={
    userMiddleware
}