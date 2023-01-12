const { Customer } = require("../db")

module.exports = {

    create: async (req, res) => {
        const customer = req.body

        try {

            if (!customer.name || !fieldValidation(customer.name)) throw new Error("Missing or invalid customer name input!")
            if (!customer.lastname || !fieldValidation(customer.lastname)) throw new Error("Missing or invalid customer last name input!")
            if (!customer.email || !emailValidation(customer.email)) throw new Error("Missing or invalid customer email input!")

            await Customer.create(customer)
            return res.status(201).send("Successfully created customer!")

        } catch (e) {
            return res.status(500).send(`Could not create a customer: ${e.message || e}`)
        }

        return res.send("ok")
    },

    getByEmail: async (req, res) => {
        const { customerEmail } = req.params
        try {

            if (!customerEmail || !emailValidation(customerEmail)) throw new Error("Missing or invalid customer email input!")

            const customer = await Customer.findOne({ where: {email: customerEmail} })
            return res.status(200).send(customer)

        } catch (e) {
            return res.status(500).send(`Could not return a customer: ${e.message || e}`)
        }

    }

}

function fieldValidation(input) {
    return typeof input === "string" && input.trim(" ").length > 0
}

function emailValidation(input) {
    return fieldValidation(input) && input.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/) != null
}