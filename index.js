require('dotenv').config()
const express = require('express')
const getMovies = require('./scrape/searchMovies')

const app = express()

app.get('/search/:movie', (req, res) => {
    getMovies(req.params.movie)
        .then(movies => {
            res.json(movies)
        })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`)
})
