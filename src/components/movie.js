import React, { Component } from 'react';
import './movie.css'

function Movie({Title, Poster, Year}) {
    return (
        <div className="movieCard">
            <h1 className="title">{Title}<span className="year"> ({Year})</span></h1>
            <img className="year" src={`${Poster}`} height="50px"/>
        </div>
    )
}

export default Movie;