import React from 'react';

const Movies = (props) => {
    const { movies } = props;
	const loaded = () => (
		<div>
			<h1>{props.genre.name} Movies</h1>
			{movies.map((movie) => (
				<div>
					<p>{movie.title}</p>
					<p>{movie.year}</p>
					<img src={movie.img} alt={movie.title} />
                    <div>
					<button
						onClick={() => {
							props.selectMovie(movie);
							props.history.push('/edit');
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							props.deleteMovie(movie);
						}}>
						Delete
					</button>
                    </div>
				</div>
			))}
		</div>
	);
	const loading = <h1>Loading...</h1>;
	return movies.length > 0 ? loaded() : loading;
};

export default Movies;
