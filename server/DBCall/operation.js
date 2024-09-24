const customException = require("../utils/customException");
const statusCode = require("../utils/statusCode")
const Operation = require("../models/operation")
const Api = require("../models/api")

module.exports = {
    createOperation: async (data) => {
        try {
            const { endpoint, method, apiId } = data

            if (!endpoint || !method || !apiId) throw customException.error(statusCode.BAD_REQUEST, "Please Enter Valid inputs", "Please Enter Valid inputs")

            const result = await Operation.create({ endpoint, method })

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to create operation", "Failed to create operation")

            const resultFinal = await Api.findOneAndUpdate({ _id: data.apiId }, { $push: { operation: result._id } })
            return resultFinal
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    },
    updateOperation: async (data) => {
        const bulkOps = data.map(d => ({
            updateOne: {
                filter: { _id: d._id },
                update: { $set: { template: d.template } }
            }
        }));

        try {
            const result = await Operation.bulkWrite(bulkOps);

            if (!result) throw customException.error(statusCode.SERVER_ERROR, "Failed to update operation", "Failed to update operation")

            return result
        } catch (e) {
            throw customException.error(statusCode.SERVER_ERROR, e.message, e.displayMessage)
        }
    }
}