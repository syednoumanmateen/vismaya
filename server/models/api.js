const mongoose = require("mongoose")

const apiSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String
    },
    operation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "operation"
    }],
    version: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "version"
    }],
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "online"
    },
    plan: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "plan"
    }],
    clientId: {
        type: Number,
        default: "12345"
    }
}, {
    timestamps: true,
    collection: "Api"
})

module.exports = mongoose.model("Api", apiSchema)