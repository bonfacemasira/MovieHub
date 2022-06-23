document.addEventListener('DOMContentLoaded', ()=>{
    const input = document.getElementById('search');
    const button = document.getElementById('button');
    const movieContainer = document.getElementById('movieContainer');

    //create elements


    // function createMovieElements() {
    //     movieContainer.innerHTML = `
    //     <div class="column">
    //         <div class="card">
    //             <div class="posterHolder">
    //                 <img src=""/>
    //             </div>
    //         </div>
    //         <div class="description">
    //             <h5 class="text">
    //             </h5>
    //         </div>
    //     </div>
    //     `
    // }

    // createMovieElements();

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
        posterHolder.appendChild(moviePoster);

        let description = document.createElement('div');
        description.className="description";
        column.appendChild(description);
    
        let text = document.createElement('div');
        text.className= "text"
        text.innerHTML = `<h5>${x.original_title}</h5> <div class="card-panel" style="background:#810000;color:white;"> ${(x.vote_average)} <span id=stars>${getStars(x.vote_average)}</span> </div>`
        description.appendChild(text);

        movieContainer.appendChild(column);
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
    fetchMovies()


})