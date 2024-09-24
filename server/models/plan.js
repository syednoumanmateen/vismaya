const mongoose = require("mongoose")

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    collection: "Plan"
})

module.exports = mongoose.model('Plan', planSchema)