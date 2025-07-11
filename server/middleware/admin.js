const jwt=require("jsonwebtoken");
function adminMiddleware(req,res,next){
    const token=req.headers.token;
     if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
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