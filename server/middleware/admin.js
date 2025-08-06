const jwt=require("jsonwebtoken");
function adminMiddleware(req,res,next){
    const token = req.headers.token || req.headers.authorization?.split(" ")[1];
      if (!token) {
    return res.status(403).json({
      status: false,
      message: "No token, please sign in",
    });
  }
        try {
        const decoded = jwt.verify(token, process.env.JWT_ADMIN);
        req.adminId = decoded.id;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token. Please sign in again." });
    }
}


module.exports={
    adminMiddleware
}