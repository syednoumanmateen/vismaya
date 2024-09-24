const response = require("../utils/response");
const statusCode = require("../utils/statusCode");
const versionService = require("../DBCall/version")

module.exports = {
    createVersion: async (req, res) => {
        try {
            const result = await versionService.createVersion(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Version created successfully", "Version created successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    },
    getAllVersion: async (req, res) => {
        try {
            const result = await versionService.getAllVersion(req.body)
            res.status(statusCode.SUCCESS).json(response.successWith(result, statusCode.SUCCESS, "Version Fetched successfully", "Version Fetched successfully"))
        } catch (e) {
            res.status(e.errorCode).json(response.errorWith(e.errorCode, e.message, e.displayMessage, e.customStatusCode, e.customData));
        }
    }
}