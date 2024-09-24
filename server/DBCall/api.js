const customException = require("../utils/customException");
const statusCode = require("../utils/statusCode");
const Api = require("../models/api")
const Version = require("../models/version")
const Plan = require("../models/plan");
const { default: mongoose } = require("mongoose");

module.exports = {
    createApi: async (data) => {
        try {
            const { name, status, version, plan } = data

            if (!name) throw customException.error(statusCode.BAD_REQUEST, "Please Enter Valid inputs", "Please Enter Valid inputs")

            let inputData = { name, status }

            if (!version) {
                const result = await Version.findOne({ default: true }).lean()
                inputData.version = result._id
            }

            if (!plan) {
                const result = await Plan.findOne({ default: true }).lean()
                inputData.plan = result._id
            }

            const result = await Api.create(inputData)

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to create api", "Failed to create api")

            return result
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getAllApi: async (data) => {
        try {
            const regex = new RegExp(data.search, 'i')
            const result = await Api.aggregate([{
                $lookup: {
                    from: "Operation",
                    localField: "operation",
                    foreignField: "_id",
                    as: "operationDetails"
                }
            }, {
                $lookup: {
                    from: "Version",
                    localField: "version",
                    foreignField: "_id",
                    as: "versionDetails"
                }
            }, {
                $lookup: {
                    from: "Plan",
                    localField: "plan",
                    foreignField: "_id",
                    as: "planDetails"
                }
            }, {
                $project: {
                    name: 1,
                    description: 1,
                    status: 1,
                    clientId: 1,
                    operation: "$operationDetails",
                    version: "$versionDetails",
                    plan: "$planDetails"
                }
            }])

            if (result && result.length) {
                return result
            }

            throw customException.error(statusCode.SERVER_ERROR, "Failed to fetch api", "Failed to fetch api")
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getApi: async (data) => {
        try {
            const objId = new mongoose.Types.ObjectId(data.id)
            const result = await Api.aggregate([{ $match: { _id: objId } }, {
                $lookup: {
                    from: "Operation",
                    localField: "operation",
                    foreignField: "_id",
                    as: "operationDetails"
                }
            }, {
                $lookup: {
                    from: "Version",
                    localField: "version",
                    foreignField: "_id",
                    as: "versionDetails"
                }
            }, {
                $lookup: {
                    from: "Plan",
                    localField: "plan",
                    foreignField: "_id",
                    as: "planDetails"
                }
            }, {
                $project: {
                    name: 1,
                    description: 1,
                    status: 1,
                    clientId: 1,
                    operation: "$operationDetails",
                    version: "$versionDetails",
                    plan: "$planDetails"
                }
            }])

            if (result && result.length) {
                return result[0]
            }

            throw customException.error(statusCode.SERVER_ERROR, "Failed to fetch api", "Failed to fetch api")
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    deleteApi: async (data) => {
        try {
            const result = await Api.findOneAndDelete({ _id: data.id }).lean()

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to delete api", "Failed to delete api")

            return result
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    }
}