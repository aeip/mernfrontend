import React from 'react';

const Genre = (props) => {
    const {genres} = props;
    const loaded = () => (
        <div>
            <h1>Genres</h1>
            {genres.map((genre) => (
                <button onClick={() => {props.selectGenre(genre)}}>{genre.name}</button>
            ))}
        </div>
    );
    const loading = <h1>Loading...</h1>
    return genres.length > 0 ? loaded() : loading;
};

export default Genre;