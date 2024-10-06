const Job = require("../models/job_model.js");



// recruiter created job
const postJob=async (req,res)=>{

    try{

        const {title,description,requirements,salary,location,jobType,experience,position,companyId}=req.body;

        const userId=req._id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({msg:"Please fill all details"})
        }

        const job=await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            jobType,
            experienceLevel:experience,
            position,
            company:companyId,
            created_by:userId
            
        })
        return res.status(200).json({msg:"New Job created",job})




    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

const getAllJob=async(req,res)=>{
    try{
        const keyword=req.query.keyword || ""

        // this is used for searching jobs
        const query={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}},
            ]  
        };
        // its give all jobs , but we need that company details also , for which we alrady give companyId
        // const jobs=await Job.find(query)


        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1})

        if(!jobs){
            return res.status(404).json({ msg: "No Jobs Found" })

        }
        return res.status(200).json({ msg: "List Of Jobs",jobs })


    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}

// student
const getJobById=async(req,res)=>{

    try{

        const jobId=req.params.id

        const job=await Job.findById(jobId)

        
        if(!job){
            return res.status(404).json({ msg: "No Jobs Found" })

        }
        return res.status(200).json({ msg: " Jobs by using id",job })



    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

// all job created by recruiter 

const getAllJobByRecruiter=async(req,res)=>{
    try{

        const recruiterId=req._id;

        
        const jobs=await Job.find({created_by:recruiterId})

         
        if(!jobs){
            return res.status(404).json({ msg: "No Jobs Found" })

        }
        return res.status(200).json({ msg: " Jobs by using id",jobs })

    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }
}



module.exports={postJob,getAllJob,getJobById,getAllJobByRecruiter}