document.addEventListener('DOMContentLoaded', ()=>{
    const input = document.getElementById('search');
    const button = document.getElementById('button');
    const movieContainer = document.getElementById('movieContainer');
    const inputForm = document.querySelector('form');

    //create elements
    const createElements = (x) =>{
        let column = document.createElement('div');
        column.className = 'column';

        let card = document.createElement('div');
        card.className = 'card';
        column.appendChild(card);

        let posterHolder = document.createElement('div');
        posterHolder.className = 'posterHolder';
        card.appendChild(posterHolder);

        let moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w1280${x.poster_path}`;
        moviePoster.style.width = "100%";
        moviePoster.style.height = "100%";
        
        posterHolder.appendChild(moviePoster);

        let description = document.createElement('div');
        description.className="description";
        column.appendChild(description);
    
        let text = document.createElement('div');
        text.className= "text"
        text.style.backgroundColor = "white";
        text.innerHTML = `<h5>${x.original_title}</h5> <div class="card-panel" style="background:#810000;color:white;"> ${(x.vote_average)} <span id=stars>${ratingStars(x.vote_average)}</span> </div>`
        description.appendChild(text);

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
        fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8d07a996f1bf5f9cee356b413d8fa485`)
        .then((resp) => resp.json())
        .then(data => {
            data.results.forEach(element => {
                createElements(element)
            });
        })
    }
    fetchMovies();


    // search for a movie on the page
    const searchMovies =()=>{
        let value = input.value;
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=8d07a996f1bf5f9cee356b413d8fa485&query="${value}`)
        .then((resp) => resp.json())
        .then(movies=>{
            movieContainer.innerHTML="";
            movies.results.forEach(element => {
                createElements(element)
            });
        })
    }

    //search by enter key
    inputForm.addEventListener('submit', (event)=>{
        event.preventDefault();
        searchMovies()
    })
    
})