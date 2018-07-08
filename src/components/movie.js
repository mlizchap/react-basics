import React, { Component } from 'react';
import './movie.css'

function Movie({Title, Poster, Year}) {
    return (
        <div className="movieCard">
            <img className="year" src={`${Poster}`} height="200px"/>
        </div>
    )
}

export default Movie;