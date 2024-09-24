const { createApi, getAllApi, getApi, deleteApi } = require("../controllers/api")

module.exports = function (router) {
    router.post("/create", createApi)
    router.get("/getall", getAllApi)
    router.get("/get/:id", getApi)
    router.delete("/delete/:id", deleteApi)
}