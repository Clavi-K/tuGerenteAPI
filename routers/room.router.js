const router = require("express").Router()

const controller = require("../controllers/room.controller.js")

router.post("/create", controller.create)
router.get("/:number", controller.getByNumber)

module.exports = router