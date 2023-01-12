require("dotenv").config()
const express = require("express")

const routers = require("./routers")

const app = express()
const PORT = process.env.PORT || 8082

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", routers)

const { connection } = require("./db/index")

connection.authenticate().then(() => {
    console.log("Successful database connection!")

    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
        connection.sync({ force: false })
    })
})
