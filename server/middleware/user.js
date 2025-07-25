const jwt=require("jsonwebtoken");


function userMiddleware(req,res,next){
     const token = req.headers.token || req.headers.authorization?.split(" ")[1];
    if (!token) {
    return res.status(403).json({
      status: false,
      message: "No token, please sign in",
    });
  }
  try{
  const decode=jwt.verify(token,process.env.JWT_USER);
  req.userId=decode.id;
  next();
 }catch(err){
    return res.status(403).json({
      status: false,
      message: "Invalid token, please login again",
    })
  }
}


module.exports={
    userMiddleware
}