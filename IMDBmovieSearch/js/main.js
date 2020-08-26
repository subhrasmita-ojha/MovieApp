const api_key = '9b5071c8';

// request for list of movies
document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const searchText = document.getElementById('searchText').value;
  
  axios.get(`http://www.omdbapi.com/?apikey=${api_key}&s=${searchText}`)
    .then(res => {
      if (res.data.Error){
        document.getElementById('movieList').innerHTML = `<h4>${res.data.Error}</h4>`;
      } else {
        const movies = res.data.Search;
        let output = '';

        for(movie of movies) {
          output += `
          <div class="cols-12 col-md-4">
            <div class="card">
              <img src="${movie.Poster}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${movie.Title} <small>(${movie.Year})</small></h5>
                <a onclick="selectedMovie('${movie.imdbID}')" href="#" class="btn btn-primary">Show Details</a>
              </div>
            </div>
          </div>
          `
        }

        document.getElementById('movieList').innerHTML = output;
      }
    })
    .catch(err => {
      console.error(err);
    });
});

// selected movie
function selectedMovie (id) {
  console.log(id);
  sessionStorage.setItem('movieId', id);
  location.href = 'movie.html';
  document.getElementById('searchText').value = '';
}

// get the details of selected movie
function getMovie() {
  const movieId = sessionStorage.getItem('movieId');

  axios.get(`http://www.omdbapi.com/?apikey=${api_key}&i=${movieId}&plot=full`)
    .then(res => {
      if (res.data.Error){
        document.getElementById('movieDetails').innerHTML = `<h4>${res.data.Error}</h4>`;
      } else {
        console.log(res.data);
        const movie = res.data;
        let output = '';

        output = `
        <div class="row no-gutters">
          <div class="cols-12 col-md-4">
            <img src="${movie.Poster}" alt="${movie.Title}" class="thumbnail">
          </div>
          <div class="cols-12 col-md-8">
            <h3>${movie.Title}</h3>
            <ul class="list-group">
              <li class="list-group-item"><b>Genre: </b>${movie.Genre}</li>
              <li class="list-group-item"><b>Released: </b>${movie.Released}</li>
              <li class="list-group-item"><b>Rated: </b>${movie.Rated}</li>
              <li class="list-group-item"><b>IMDB Rating: </b>${movie.imdbRating}</li>
              <li class="list-group-item"><b>Director: </b>${movie.Director}</li>
              <li class="list-group-item"><b>Writer: </b>${movie.Writer}</li>
              <li class="list-group-item"><b>Actors: </b>${movie.Actors}</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="card my-3">
            <div class="card-body p-4">
              <h4 class="card-title">Plot</h4>
              <p class="text-justify">${movie.Plot}</p>
              <hr>
              <div class="float-right">
              <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="index.html" class="btn btn-secondary">Back To Search</a>
              </div>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="cols-12 col-md-6">
            <div class="card">
              <div class="card-body">
                <ul class="list-group">
                  <li class="list-group-item"><b>Awards: </b>${movie.Awards}</li>
                  <li class="list-group-item"><b>Box Office Collection: </b>${movie.BoxOffice}</li>
                  <li class="list-group-item"><b>Production: </b>${movie.Production}</li>
                  <li class="list-group-item"><b>Run Time: </b>${movie.Runtime}</li>
                  <li class="list-group-item"><b>IMDB Votes: </b>${movie.imdbVotes}</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="cols-12 col-md-6 align-self-center">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Ratings: </h5>
                <ul class="list-group">
                    <li class="list-group-item"><b>${movie.Ratings[0].Source}: </b>${movie.Ratings[0].Value}</li>
                    <li class="list-group-item"><b>${movie.Ratings[1].Source}: </b>${movie.Ratings[1].Value}</li>
                    <li class="list-group-item"><b>${movie.Ratings[2].Source}: </b>${movie.Ratings[2].Value}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        `;

        document.getElementById('movieDetails').innerHTML = output;
      }
    })
    .catch(err => {
      console.error(err);
    });
}


