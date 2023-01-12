const { Reservation, Customer, Room } = require("../db")


const possibleStatus = ["PENDING", "PAYED", "DELETED"]
const possiblePaymentMethods = ["CASH", "CREDITCARD", "DEBITCARD"]

module.exports = {

    create: async (req, res) => {
        const { reservation } = req.body

        try {

            if (!reservation.status || !possibleStatus.includes(reservation.status)) throw new Error("Missing or invalid reservation status input!")
            if (!reservation.startDate || new Date(reservation.startDate) == "Invalid Date") throw new Error("Missing or invalid reservation start date input!")
            if (!reservation.endDate || new Date(reservation.endDate) == "Invlid Date") throw new Error("Missing or invalid reservation end date input!")
            if (!reservation.price || isNaN(Number(reservation.price)) || Number(reservation.price) <= 0) throw new Error("Missing or invalid reservation price input!")
            if (!reservation.paymentMethod || !possiblePaymentMethods.includes(reservation.paymentMethod)) throw new Error("Missing or invalid reservation payment method input!")

            reservation.price = Number(reservation.price)
            reservation.startDate = new Date(reservation.startDate)
            reservation.endDate = new Date(reservation.endDate)

            if (reservation.startDate > reservation.endDate) throw new Error("The start date can not be after the end date!")
            if (reservation.startDate < new Date(Date.now())) throw new Error("The start date can not be before today!")

            const result = await Reservation.create(reservation)

            const customer = await Customer.findOne({ where: { email: req.body.customerEmail } })
            const room = await Room.findOne({ where: { number: Number(req.body.roomNumber) } })

            if (!customer || !room) throw new Error("Missing or invalid customer or room identifier input!")

            result.setCustomer(customer)
            result.setRoom(room)

            return res.status(201).send("Successfully created reservation!")

        } catch (e) {
            return res.status(500).send(`Could not create a reservation: ${e.message || e}`)
        }
        
    },
    
    getAll: async(req,res) => {
        
        try {
            
            const reservations = await Reservation.findAll()
            reservations.forEach(r => {
                return
            })

            return res.status(200).send(reservations)
            
        } catch(e) {
            return res.status(500).send(`Could not reutrn all reservations: ${e.message || e}`)
        }

    },

    setStatus: async (req, res) => {

        const { reservationId, status } = req.body

        try {

            if (!reservationId || typeof reservationId !== "string") throw new Error("Missing or invalid reservation ID input!")
            if (!status || !possibleStatus.includes(status)) throw new Error("Missing or invalid status input!")

            const reservation = await Reservation.findOne({ where: { id: reservationId } })
            if (!reservation) throw new Error("Reservation does not exist!")

            await Reservation.update({ status }, { where: { id: reservationId } })

            return res.status(200).send("Successfully updated reservation!")

        } catch (e) {
            return res.status(500).send(`Could not update reservation status: ${e.message || e}`)
        }

    }

}