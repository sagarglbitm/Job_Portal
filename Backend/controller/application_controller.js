const Application = require("../models/application_model");
const Job = require("../models/job_model");


const applyJob=async(req,res)=>{

    try{

        const userId=req._id;
        const jobId=req.params.id;

        if(!jobId){
            return res.status(400).json({ msg: "jobId is Required" })
        }

        // check user is already applied on not

        const existingApplication=await Application.findOne({job:jobId,applicant:userId})

        if(existingApplication){

            return res.status(400).json({ msg: "you already applied for this job" })

        }
        // check if job exist

        const job=await Job.findById(jobId)

        if(!job){

            return res.status(404).json({ msg: "job not found" })

        }


        // create a new application

        const newApplication=await Application.create({
            job:jobId,
            applicant:userId

        })

        job.applications.push(newApplication._id)

        await job.save()

        return res.status(200).json({ msg: "job applied successfully" })

    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

// applied job by user
const getAllAppliedJOB=async(req,res)=>{

    try{
        const userId=req._id

        const application=await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:"job",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"company",
                options:{sort:{createdAt:-1}},
            }

        })

        if(!application){

            return res.status(404).json({ msg: "No application found" })

        }

        return res.status(200).json({ msg: "applied jobs by you" ,application})

    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

// admin check no of user applied for the job created by him

const getAllApplicants =async(req,res)=>{

    try{

        const jobId=req.params.id

        const job=await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })

        if(!job){

            return res.status(404).json({ msg: "job not found" })

        }

        return res.status(200).json({ msg: "all jobs ",job })



    }

    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}

const updateStatus=async(req,res)=>{

    try{
        const{status}=req.body;
        const applicationId=req.params.id

        if(!status){
            return res.status(400).json({ msg: "status is required" })
        }

        // find application by applicanstId

        const application=await Application.findOne({_id:applicationId})

        if(!application){
            return res.status(400).json({ msg: "application is not found" })
        }

        // update status

        application.status=status.toLowerCase()

        await application.save()

        return res.status(200).json({ msg: "status updated successfully" })


    }
    catch(e){
        console.log(e)
        return res.status(500).json({ msg: "Internal Server Error" })
    }

}



module.exports={applyJob,getAllAppliedJOB,getAllApplicants,updateStatus}