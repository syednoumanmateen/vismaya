const { createOperation, updateOperation } = require("../controllers/operation")

module.exports = function (router) {
    router.post("/operation/create", createOperation)
    router.put("/operation/update", updateOperation)
}