require('dotenv').config()
const express = require('express')
const getMovies = require('./scrape/searchMovies')
const getMovie = require('./scrape/scrapeMovie')

const app = express()

app.get('/search/:movie', (req, res) => {
    getMovies(req.params.movie)
        .then(movies => {
            res.json(movies)
        })
})

app.get('/movie/:id', (req, res) => {
    getMovie(req.params.id)
        .then(movie => {
            res.json(movie)
        })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server listening http://localhost:${PORT}`)
})
