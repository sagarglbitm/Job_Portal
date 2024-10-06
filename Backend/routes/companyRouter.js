
const express=require("express");
const { registerCompany, getCompany, getCompanyById, updateCompany } = require("../controller/company_controller");
const { isAuthenticated } = require("../middleware/isAuthenticated");

const companyRouter=express.Router();

companyRouter.post("/registerCompany",isAuthenticated,registerCompany)
companyRouter.get("/getCompany",isAuthenticated,getCompany)
companyRouter.get("/getCompany/:id",isAuthenticated,getCompanyById)
companyRouter.put("/updateCompany/:id",isAuthenticated,updateCompany)

module.exports={companyRouter}