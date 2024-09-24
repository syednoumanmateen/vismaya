const customException = require("../utils/customException");
const statusCode = require("../utils/statusCode")
const Plan = require("../models/plan")
const Api = require("../models/api")

module.exports = {
    createPlan: async (data) => {
        try {
            const { amount, name, apiId } = data

            if (!amount || !name || !apiId) throw customException.error(statusCode.BAD_REQUEST, "Please Enter Valid inputs", "Please Enter Valid inputs")

            const result = await Plan.create({ amount, name })

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to create plan", "Failed to create plan")

            const resultFinal = await Api.findOneAndUpdate({ _id: data.apiId }, { $push: { plan: result._id } })
            return resultFinal
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    updatePlan: async (data) => {
        try {
            const result = await Plan.findOneAndUpdate({ _id: data.id }, data).lean()

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to update plan", "Failed to update plan")

            return result
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    deletePlan: async (data) => {
        try {
            const result = await Plan.findOneAndDelete({ _id: data.id }).lean()

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to delete plan", "Failed to delete plan")

            return result
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    }
}