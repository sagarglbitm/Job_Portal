
const Company=require("../models/company_model.js")

const registerCompany=async(req,res)=>{

    try{

        const {name}=req.body
        if(!name){
            return res.status(400).json({msg:"company name is required"})
        }

        let company=await Company.findOne({name})
        if(company){
            return res.status(400).json({msg:"This comapny name is already registered"})
        }
        company=await Company.create({
            name,
            userId:req._id

        })

        return res.status(200).json({msg:"Congrulation new company is created",company})

    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }


}

const getCompany=async(req,res)=>{

    try{

        const userId=req._id // those who created those company can see only not others created compnay also
        const companies=await Company.find({userId})

        if(!companies){
            return res.status(404).json({msg:"no company is created by you"})
        }

        return res.status(200).json({msg:"Here is your created company",companies})

    }
    catch(e){
    
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

const getCompanyById=async(req,res)=>{

    try{

        const companyId=req.params.id // those who created those company can see only not others created compnay also
        const company=await Company.findById({_id:companyId})

        if(!company){
            return res.status(404).json({msg:"no company is created by you"})
        }
        return res.status(200).json({msg:"Here is your created company",company})

    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

const updateCompany=async(req,res)=>{

    try{
    const{name,description,website,location}=req.body
    const file=req.file

    // cloudanry

    const updateData={name,description,website,location}

    const updateCompany=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true}) 

    if(!updateCompany){
        return res.status(404).json({msg:"no company is found for upadte"})
    }
    return res.status(200).json({msg:"Here is your upadted company details",updateCompany})
    
 

    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

module.exports={registerCompany,getCompany,getCompanyById,updateCompany}