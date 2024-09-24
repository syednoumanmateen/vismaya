const mongoose = require("mongoose")

const versionSchema = new mongoose.Schema({
    version: {
        type: String
    }
}, {
    timestamps: true,
    collection: "Version"
})

module.exports = mongoose.model('Version', versionSchema)