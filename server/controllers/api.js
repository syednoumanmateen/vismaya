const response = require("../utils/response");
const statusCode = require("../utils/statusCode");
const apiService = require("../DBCall/api")

module.exports = {
    createApi: async (req, res) => {
        try {
            const result = await apiService.createApi(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Api created successfully", "Api created successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    },
    getAllApi: async (req, res) => {
        try {
            const result = await apiService.getAllApi(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Api Fetched successfully", "Api Fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    },
    getApi: async (req, res) => {
        try {
            const result = await apiService.getApi(req.params)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Api Fetched successfully", "Api Fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    },
    deleteApi: async (req, res) => {
        try {
            const result = await apiService.deleteApi(req.params)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Api Deleted successfully", "Api Deleted successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    }
}