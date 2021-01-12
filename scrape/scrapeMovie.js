const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://www.imdb.com/title/'

const movieCache = {}

const scrapeMovie = async (movieID) => {
    if(movieCache[movieID]) {
        console.log('SERVING MOVIE FROM CACHE')
        return Promise.resolve(movieCache[movieID])
    }

    const { data } = await axios.get(`${baseUrl}${movieID}`)
    const $ = cheerio.load(data)

    const title = $('h1') //.text() returns all the text inside element, even the text of elements children
        .children()
        .remove()
        .end()
        .text()

    const duration = $('.subtext').find('time').text().trim()
    const releaseDate = $('.title_wrapper .subtext a:last-child').text().trim()
    const plot = $('.summary_text').text().trim()
    const storyline = $('.canwrap p span').text().trim()
    const rating = $('span[itemprop="ratingValue"]').text()
    const poster = $('.poster img').attr('src')
    const trailer = $('.slate a').attr('href')

    const genres = []
    $('h4:contains("Genres")').parent().find('a').each((i, el) => {
        genres.push($(el).text().trim())
    })

    const directors = []
    //select directors   
    $('.credit_summary_item')
        .first()
        .find('a')
        .each((i, el) => {
            const director = $(el).text()
            directors.push(director)
        })

    const cast = []
    $('.cast_list tr').filter((i, el) => i !== 0).each((i, el) => {
        const actorImg = $(el).find('.primary_photo img').attr('src')
        const actor = $(el).find(':nth-child(2) > a').text().trim()
        cast.push({
            actor,
            actorImg
        })
    })

    const movie = {
        title,
        duration,
        releaseDate,
        rating,
        plot,
        poster,
        directors,
        cast,
        trailer,
        storyline,
        genres
    }

    movieCache[movieID] = movie
    return movie
}

module.exports = scrapeMovie