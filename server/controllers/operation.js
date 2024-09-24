const operationService = require("../DBCall/operation");
const response = require("../utils/response");
const statusCode = require("../utils/statusCode");

module.exports = {
    createOperation: async(req,res)=> {
        try {
            const result = await operationService.createOperation(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Operation created successfully", "Operation created successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    },
        updateOperation: async(req,res)=> {
        try {
            const result = await operationService.updateOperation(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Operation Updated successfully", "Operation Updated successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    }
}