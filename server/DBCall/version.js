const customException = require("../utils/customException");
const statusCode = require("../utils/statusCode")
const Version = require("../models/version")
const Api = require("../models/api")

module.exports = {
    createVersion: async (data) => {
        try {
            const { version, apiId } = data

            if (!version || !apiId) throw customException.error(statusCode.BAD_REQUEST, "Please Enter Valid inputs", "Please Enter Valid inputs")

            const result = await Version.create({ version })

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to create version", "Failed to create version")

            const resultFinal = await Api.findOneAndUpdate({ _id: data.apiId }, { $push: { version: result._id } })
            return resultFinal
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    getAllVersion: async () => {
        try {
            const result = await Version.aggregate[{
                $lookup: {
                    fron: "api",
                    localField: "apiId",
                    foreignField: "_id",
                    as: "apiDetails"
                }
            }, {
                $unwind: {
                    path: "$apiDetails",
                    preserveNullAndEmptyArrays: true
                }
            }, {
                $project: {
                    version: 1,
                    api: "$apiDetails"
                }
            }]

            if (result && result.length) {
                return result
            }

            throw customException.error(statusCode.SERVER_ERROR, "Failed to fetch version", "Failed to fetch version")
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    }
}