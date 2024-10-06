
const express  = require("express")
const { login, register, updateUser, logOut } =require(  "../controller/user_controller.js")
const { isAuthenticated } =require( "../middleware/isAuthenticated")

const userRouter=express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",logOut)
userRouter.post("/profile/update",isAuthenticated,updateUser)


module.exports={userRouter}