import React from "react";
import axios from 'axios';
import './SearchBar.css';
import { IconButton, TextField } from '@mui/material';
import { AiOutlineSearch } from "react-icons/ai";

// Citation - code is based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
const SearchBar = (props) => {
    // Two different types of search bars (one for recipe search and one for saved recipes)
    let submitType = '';
    let onSubmit = (e) => { e.preventDefault() };
    let onInput = () => {};
    if (props.route === 'recipesearch') {
        submitType = 'submit';
        onSubmit = async(e) => {
            e.preventDefault();
            const searchQuery = document.getElementById('searchBar').value;
            props.setSearchQuery(searchQuery);
            const url = process.env.REACT_APP_SERVER_HOSTNAME + '/' + props.route ;
            // Send a GET request to the server with the user's search query
            try {
                const jwtToken = localStorage.getItem("token")
                const authToken = 'jwt ' + jwtToken + ''
                const response = await axios.get(url, { params: { searchQuery: searchQuery }, headers: { Authorization: authToken } });
                props.setSearchResults(response.data.searchResults);
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        submitType = 'button';
        onInput = (e) => { props.setSearchQuery(e.target.value); };
    }

    // Return the search bar component
    return (
        <form onSubmit={onSubmit}>
            <TextField
                id="searchBar"
                className="text"
                onInput={onInput}
                label= "Search"
                variant="outlined"
                size="small"
            />
            <IconButton type={submitType} aria-label="search">
                <AiOutlineSearch />
            </IconButton>
        </form>
    );
}

export default SearchBar;