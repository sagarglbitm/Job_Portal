const express=require("express")
const { isAuthenticated } = require("../middleware/isAuthenticated");
const { applyJob, getAllAppliedJOB, getAllApplicants, updateStatus } = require("../controller/application_controller");

const applicationRouter=express.Router();

applicationRouter.get("/applyJob/:id",isAuthenticated,applyJob)
applicationRouter.get("/getAllAppliedJOB",isAuthenticated,getAllAppliedJOB)
applicationRouter.get("/:id/getAllApplicant",isAuthenticated,getAllApplicants)
applicationRouter.post("/updateStatus/:id",isAuthenticated,updateStatus)

module.exports={applicationRouter}

