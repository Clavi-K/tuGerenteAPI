const router = require("express").Router()
const controller = require("../controllers/customer.controller")

router.post("/create", controller.create)

router.get("/:customerEmail", controller.getByEmail)

module.exports = router