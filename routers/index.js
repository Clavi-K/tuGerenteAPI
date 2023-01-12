const router = require("express").Router()

const customerRouter = require("./customer.router")
const roomRouter = require("./room.router")
const reservationRouter = require("./reservation.router")

router.use("/customers", customerRouter)
router.use("/rooms", roomRouter)
router.use("/reservations", reservationRouter)

module.exports = router