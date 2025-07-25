const  express=require("express")
const userRouters=require("./routes/userRoute")
const adminRouters=require("./routes/adminRouters")
const cros=require("cors");
const connectiondb=require("./config/db")
require('dotenv').config()

const app=express();
app.use(cros({
    origin:["http://localhost:5173"],
    allowedHeaders:['Content-Type','Authorization'],
    methods:['GET','POST','DELETE','OPTIONS'],
    credentials:true
}))

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