

// this is old way to 
// const express=require("express") 

// to use import keyword in node , we have to write type:module in pacakge.json
const express =require( "express");
const cookieParser =require( "cookie-parser");
const cors =require( "cors");
const dotenv =require(  "dotenv");
const connectDB =require(  "./utils/db.js");
const  {userRouter } =require( "./routes/userRouter.js");
const { companyRouter } = require("./routes/companyRouter");
const { jobRouter } = require("./routes/jobRouter.js");
const { applicationRouter } = require("./routes/applicationRouter.js");


const app=express()

dotenv.config({})




//  please learn :this middleware is compulsary to write in any backend project
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(cors(corsOptions))

// routing
app.use("/user",userRouter)
app.use("/company",companyRouter)
app.use('/job',jobRouter)
app.use("/application",applicationRouter)






const PORT=process.env.PORT || 4000
app.listen(PORT,()=>{
    connectDB()
    console.log("server started at ",PORT)})

