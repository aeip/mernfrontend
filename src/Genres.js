import React from 'react';
import { Link } from 'react-router-dom';

const Genre = (props) => {
    const {genres} = props;
    const loaded = () => (
			<div>
				<h1>Genres</h1>
				{genres.map((genre) => (
					<Link to={"/movie/" + genre.name} >
						<button
							onClick={() => {
								props.selectGenre(genre);
							}}>
							{genre.name}
						</button>
					</Link>
				))}
			</div>
		);
    const loading = <h1>Loading...</h1>
    return genres.length > 0 ? loaded() : loading;
};

export default Genre;