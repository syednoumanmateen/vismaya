const { createPlan, getPlan, updatePlan, deletePlan, getAllPlan } = require("../controllers/plan")

module.exports = function (router) {
    router.post("/plan/create", createPlan)
    router.put("/plan/update/:id", updatePlan)
    router.delete("/plan/delete/:id", deletePlan)
}