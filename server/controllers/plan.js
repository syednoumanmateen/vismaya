const response = require("../utils/response");
const statusCode = require("../utils/statusCode");
const planService = require("../DBCall/plan")

module.exports = {
    createPlan: async(req,res)=> {
        try {
            const result = await planService.createPlan(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Plan created successfully", "Plan created successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    },
    updatePlan: async(req,res)=> {
        try {
            const result = await planService.updatePlan(req.params)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Plan Updated successfully", "Plan Updated successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    },
    deletePlan: async(req,res)=> {
        try {
            const result = await planService.deletePlan(req.params)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Plan Deleted successfully", "Plan Deleted successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    }
}