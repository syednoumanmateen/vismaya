const mongoose = require("mongoose")

const operationSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        unique: true,
        required: true
    },
    method: {
        type: String,
        enum: ["POST", "GET", "PUT", "DELETE", "PATCH"]
    },
    template: { type: mongoose.Schema.Types.Mixed }
}, {
    timestamps: true,
    collection: "Operation"
})

module.exports = mongoose.model('Operation', operationSchema)