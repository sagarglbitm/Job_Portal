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

        req._id=decode.userId;
        next()

    }
    catch(e){

    }

}
module.exports = {isAuthenticated};