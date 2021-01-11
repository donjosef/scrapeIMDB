const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://www.imdb.com/find?q='

const getMovies = async (query) => {
    const { data } = await axios.get(`${baseUrl}${query}`)

    const $ = cheerio.load(data)

    const movies = []
    $('.findSection')
        .first()
        .find('.findResult')
        .each((i, el) => {
            const elem = $(el)
            const title = elem.find('.result_text a').first()
            const img = elem.find('img')
            const extraInfo = elem.find('.result_text').text().match(/\((.*)\)/)[0] //extract everything between ( )
            const movieID = title.attr('href').match(/title\/(.*)\//)[1] //extract movieid from href after title/

            movies.push({
                title: title.text(),
                img: img.attr('src'),
                extraInfo,
                movieID
            })
        })

        return movies
}

module.exports = getMovies