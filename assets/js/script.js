document.addEventListener('DOMContentLoaded', ()=>{
    const input = document.getElementById('search');
    const button = document.getElementById('button');
    const movieContainer = document.getElementById('movieContainer');
    const inputForm = document.querySelector('form');

    //create elements
    const createElements = (x) =>{
        const column = document.createElement('div');
        column.id = 'column';

        const card = document.createElement('div');
        card.id = 'card';
        column.appendChild(card);

        const posterHolder = document.createElement('div');
        posterHolder.id = 'posterHolder';
        card.appendChild(posterHolder);

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w1280${x.poster_path}`;
        moviePoster.style.width = "100%";
        moviePoster.style.height = "100%";
        posterHolder.appendChild(moviePoster);

        const description = document.createElement('div');
        description.id="description";
        column.appendChild(description);
    
        const text = document.createElement('div');
        text.id= "text"
        text.innerHTML = `<h5>${x.original_title}</h5> <div style="background:#810000; color:white;"> ${(x.vote_average)} <span id=stars>${ratingStars(x.vote_average)}</span> </div>`
        description.appendChild(text);

        const overview =document.createElement('div');
        overview.id = "overview";
        overview.innerHTML = `<p>${x.overview}</p> <hr> <br> <p>Realese Date: ${x.release_date}</p>`;
        column.appendChild(overview)        

        movieContainer.appendChild(column);
    }
    
    // Get rating stars
    let ratingStars = (rating) =>{
        rating = Math.round(rating * 2) / 2;
        new_rating = (rating/10)*5;
        let output = [];

        for (i = new_rating; i >= 1; i--)
        output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        if (i == .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        for (let i = (5 - new_rating); i >= 1; i--)
        output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

        return output.join('');
    }

    // Fetch movies from the api
    let fetchMovies =()=>{
        fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8d07a996f1bf5f9cee356b413d8fa485&page=${Math.floor(Math.random() * 100) + 1}`)
        .then((resp) => resp.json())
        .then(data => {
            sortMoviesByRating(data);
            sortMoviesByDate(data);
            data.results.forEach(element => {
                createElements(element)
            });
        })
    }
    fetchMovies();

    // search for a movie on the page
    let searchMovies = () =>{
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=8d07a996f1bf5f9cee356b413d8fa485&query="${input.value}`)
        .then((resp) => resp.json())
        .then(movies=>{
            movieContainer.innerHTML="";
            movies.results.forEach(element => {
                createElements(element)
            });
        })
    }

    button.addEventListener('click', (event)=>{
        event.preventDefault();
        searchMovies();
    })

    inputForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        searchMovies();
    })

    inputForm.addEventListener('change', (event)=>{
        event.preventDefault();
        searchMovies();
    })

    const sortRating = document.getElementById('sortRating');
    const sortDate = document.getElementById('sortDate');

    function sortMoviesByRating(data) {
    
    sortRating.addEventListener('click', () => {
        movieContainer.innerHTML= "";
        data.results.sort(function(a, b) {
            return (a.vote_average < b.vote_average) ? 1 : (b.vote_average < a.vote_average) ? -1 : 0
          });
        data.results.forEach(element => {
              createElements(element)
        });
    })
}

function sortMoviesByDate(data) {
    sortDate.addEventListener('click', () => {
        movieContainer.innerHTML= "";
        data.results.sort(function(a, b) {
            return (a.release_date < b.release_date) ? 1 : (b.release_date < a.release_date) ? -1 : 0
          });
        data.results.forEach(element => { 
              createElements(element)
        });
    })
}
})