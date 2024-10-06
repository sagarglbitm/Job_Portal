
const express=require("express")
const { isAuthenticated } = require("../middleware/isAuthenticated")
const { postJob, getAllJob, getJobById, getAllJobByRecruiter } = require("../controller/job_controller")

const jobRouter=express.Router()

jobRouter.post("/postJob",isAuthenticated,postJob);
jobRouter.get("/getAllJob",isAuthenticated,getAllJob)
jobRouter.get("/get/:id",isAuthenticated,getJobById)
jobRouter.get("/getJobByRecruiter",isAuthenticated,getAllJobByRecruiter)


module.exports={jobRouter}