import React from 'react';

const Movies = (props) => {
    const { movies } = props;
    console.log('movies component loaded');
	const loaded = () => (
		<div>
			<h1>{props.genre.name} Movies</h1>
			{movies.map((movie) => (
				<p>{movie.title}</p>
			))}
		</div>
	);
	const loading = <h1>Loading...</h1>;
	return movies.length > 0 ? loaded() : loading;
};

export default Movies;
