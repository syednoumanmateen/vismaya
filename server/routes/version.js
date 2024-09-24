const { createVersion, getAllVersion, getVersion, updateVersion, deleteVersion } = require("../controllers/version")

module.exports = function (router) {
    router.post("/version/create", createVersion)
    router.get("/version/getAll", getAllVersion)
}