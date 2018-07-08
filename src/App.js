import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import SearchForm from './components/searchForm';
import Movie from './components/movie';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: '',
      movies: []
    }
  }
  handleInputChange = (event) => {
    this.setState({ searchValue: event.target.value})
  }
  searchDB = (e, inputState) => {
    e.preventDefault();
    const url = 'https://www.omdbapi.com/?apikey='
    const apiKey = '8cc26a5&' 

    axios.get(`${url}${apiKey}&s=${inputState}`)
      .then(result => {
        console.log(result.data.Search)
        this.setState({movies: result.data.Search})
        //console.log(result.data.Search[0])
        //result.data.Search.map(movie => [...this.state.movies, movie])
      })
      //.then((movies) => console.log(movies))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <div className="header">
          <h1>movie app</h1>
        </div>
        <SearchForm handleSearch={this.searchDB}/>
        <div className="movieList">
          {(this.state.movies) ?
            this.state.movies.map((i, ind) => <Movie key={ind} {...i} />) 
            : <p style={{textAlign: 'center'}}>no movies found</p>
          }
        </div>
      </div>
    );
  }
}

export default App;
