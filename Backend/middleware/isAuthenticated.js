const  jwt =require("jsonwebtoken")

 const isAuthenticated=async(req,res,next)=>{

    try{
        const token=req.cookies.token
        if(!token){
            return res.status(401).json({msg:"user is not authenticated"})
        }

        const decode=await jwt.verify(token,process.env.SECRET_KEY)

        if(!decode){
            return res.status(401).json({msg:"invalid token"})
        }
        console.log(decode)

        req._id=decode.userId
        next()

    }
    catch(e){
        return res.status(500).json({ msg: "Internal Server Error" })

    }

}
module.exports = {isAuthenticated};