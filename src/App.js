import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
  const url = 'https://mernbackendsvm.herokuapp.com';
  const [genres, setGenres];
  const [movies, setMovies];

  const emptyMovie = {
    title: '',
    year: 0,
    img: '',
    genre: ''
  }

const [selectedMovie, setSelectedMovie] = React.useState(emptyMovie);
const [selectedGenre, setSelectedGenre] = React.useState({});

const getMovies = () => {
  fetch(url + '/movie/')
  .then((response) => response.json())
  .then((data) => {
    setMovies(data);
  });
};

React.useEffect(() => {
  getMovies();
},[]);

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
}

const handleGenre = (genre) => {
  const getMovies = (movie) => {
    
  }
}

  return (
    <div className="App">
      <Link to='/create'>
				<button>Add Dog</button>
			</Link>
      <switch>
        <Route exactpath="/" render={(rp) => <Genres {...rp} genres={genres} selectGenre={selectGenre} />}
        />
        <Route exactpath="/movie/" render={(rp) => <Movies {...rp} movies={movies} selectMovie={selectMovie} deleteMovie={deleteMovie} />}
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
      </switch>
    </div>
  );
}

export default App;
