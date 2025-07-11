const  express=require("express")
const userRouters=require("./routes/userRoute")
const adminRouters=require("./routes/adminRouters")
const connectiondb=require("./config/db")
require('dotenv').config()

const app=express();
const PORT=process.env.BACKEND_PORT;

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("Wlecome back to Backend World")
})
connectiondb();

app.use("/api/v1/user",userRouters)
app.use("/api/v1/admin",adminRouters)


app.listen(PORT,()=>{
    console.log(`Server is running at port ${PORT}`)
})