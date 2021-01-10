require('dotenv').config()

const express = require('express')
const app = express()
const axios = require('axios')

const PORT = process.env.PORT

app.listen(PORT, () => {
 console.log(`Server listening http://localhost:${PORT}`)   
})
