const { Room } = require("../db")

module.exports = {

    create: async (req, res) => {
        const room = req.body

        try {
            const categories = ["STANDARD", "PREMIUM", "DELUXE", "FAMILY", "COUPLE"]

            if (!room.number || isNaN(Number(room.number)) || Number(room.number) <= 0) throw new Error("Missing or invalid room number input!")
            if (!room.category || !categories.includes(room.category)) throw new Error("Missing or invalid room category input!")
            if (!room.price || isNaN(Number(room.price)) || Number(room.price) <= 0) throw new Error("Missing or invalid room price input!")

            room.number = Number(room.number)
            room.price = Number(room.price)

            await Room.create(room)
            return res.status(201).send("Successfully created room!")

        } catch (e) {
            return res.status(500).send(`Could not create a room: ${e.message || e}`)
        }

    },

    getByNumber: async (req, res) => {
        const { number } = req.params

        try {

            if (!number || typeof Number(number) != "number" || Number(number) <= 0) throw new Error("Missing or invalid room number input!")

            const room = await Room.findOne({ where: { number: Number(number) } })
            return res.status(200).send(room)

        } catch (e) {
            return res.status(500).send(`Could not return a room: ${e.message || e}`)
        }

    }

}