const router = require("express").Router()

const controller = require("../controllers/reservation.controller")

router.post("/create", controller.create)

router.get("/getAll", controller.getAll)

router.put("/setStatus", controller.setStatus)

module.exports = router