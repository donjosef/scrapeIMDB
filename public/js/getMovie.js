async function getMovie() {
    const searchParams = window.location.search
    const param = new URLSearchParams(searchParams).get('id')

    const res = await fetch('/movie/' + param)
    const data = await res.json()

    return data
}

function renderMovie(movie) {
    const content = document.querySelector('main')

    content.innerHTML = `
        <h1 class="mt-3 text-center">${movie.title}</h1>
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
                <div class="col-md-4">
                    <img src="${movie.poster}" class="card-img" alt="${movie.title}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <dl>                        
                            <dt>Plot</dt>
                            <dd>${movie.plot}</dd>
                        
                            <dt>${movie.directors.length > 1 ? 'Directors' : 'Director'}</dt>
                            <dd>${movie.directors.join(', ')}</dd>
                        
                            <dt>Cast</dt>
                            <dd>${movie.cast.map(actor => actor.actor).join(', ')}</dd>

                            <dt>Release date</dt>
                            <dd>${movie.releaseDate}</dd>

                            <dt>Duration</dt>
                            <dd>${movie.duration}</dd>
                        
                            <dt>Genres</dt>
                            <dd>${movie.genres.join(', ')}</dd>
                        
                            <dt>Trailer</dt>
                            <dd><a href="https://www.imdb.com${movie.trailer}" target="_blank">View trailer</a></dd>  
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    `
}

getMovie()
    .then(movie => {
        renderMovie(movie)
    })