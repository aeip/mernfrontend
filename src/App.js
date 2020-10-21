import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Genres from './Genres';
import Movies from './Movies';
import Form from './Form';

function App() {
  const url =
		'https://cors-anywhere.herokuapp.com/https://mernbackendsvm.herokuapp.com';
  const [genres, setGenres] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

  const emptyMovie = {
    title: '',
    year: 0,
    img: '',
    genre: ''
  }

const [selectedMovie, setSelectedMovie] = React.useState(emptyMovie);
const [selectedGenre, setSelectedGenre] = React.useState({});

const getMovies = () => {
  fetch(url + '/movie/' + selectedGenre.name)
  .then((response) => response.json())
  .then((data) => {
    console.log('data: ', data)
    setMovies(data);
  }
  ).catch((error) => console.log("error: ", error))
};

React.useEffect(() => {
  getGenres();
},[]);
React.useEffect(() => {
	getMovies();
}, [selectedGenre]);

const getGenres = () => {
  fetch(url + '/genre/')
  .then((response) => response.json())
  .then((data) => {
    setGenres(data);
  });
};

// React.useEffect(() => {
//   getMovies();
// },[]);

const handleCreate = (newMovie) => {
  fetch(url + '/movie/', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newMovie)
  }).then((response) => getMovies());
};

const handleUpdate = (movie) => {
  fetch(url + '/movie/' + movie._id, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
  })
  .then(() => { getMovies()})
}

const selectMovie = (movie) => {
  setSelectedMovie(movie);
};

const deleteMovie = (movie) => {
  fetch(url + '/movie/' + movie._id, {
    method: 'delete'
  })
  .then(() => { getMovies()})
}

const selectGenre = (genre) => {
  setSelectedGenre(genre);
  // getMovies();
  // console.log("genre", genre);
}

  return (
    <div className="App">
      <Link to='/create'>
				<button>Add Movie</button>
			</Link>
      <Switch>
        <Route exact path="/" render={(rp) => <Genres {...rp} genres={genres} selectGenre={selectGenre} />}
        />
        <Route path="/movie/" render={(rp) => <Movies {...rp} movies={movies} selectMovie={selectMovie} deleteMovie={deleteMovie} genre = {selectedGenre} />}
        />
        <Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								movie={emptyMovie}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form {...rp} label='update' movie={selectedMovie} handleSubmit={handleUpdate} />
						)}
					/>
      </Switch>
    </div>
  );
}

export default App;
