import React, { Component } from 'react';
import './searchForm.css';

class SearchForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            inputVal: ''
        }
    }
    render() {
        return (
            <form 
                className="searchForm"
                onSubmit={(e, inputState) => this.props.handleSearch(e, this.state.inputVal)}>
                <input 
                    placeholder="enter movie" 
                    value={this.state.inputVal} 
                    onChange = {(e) => this.setState({inputVal: e.target.value})}
                />
            </form>
        )
    }
}

export default SearchForm;