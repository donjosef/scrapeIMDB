const form = document.querySelector('form')
const list = document.querySelector('.list-group')

async function getMovies(e) {
    e.preventDefault()

    const movie = this.elements.search.value
    const res = await fetch('/search/' + movie)
    const data = await res.json()

    renderList(data)
}

const renderList = movies => {
    list.innerHTML = ""

    list.innerHTML = movies.map(movie => {
        return (
            `<li class="list-group-item">
                <img src="${movie.img}" />
                <div class="movie-info">
                    <h4>
                    <a href="movie.html?id=${movie.movieID}">${movie.title}</a>
                    </h4>
                    <span>${movie.extraInfo}</span>
                </div>
            </li>`
        )
    }).join("")
}


form.addEventListener('submit', getMovies)