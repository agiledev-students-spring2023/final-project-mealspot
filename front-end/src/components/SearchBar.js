import React from "react";
import './SearchBar.css';
import { IconButton, TextField } from '@mui/material';
import { AiOutlineSearch } from "react-icons/ai";

// Citation - code is based off this tutorial by Marianna: https://dev.to/mar1anna/create-a-search-bar-with-react-and-material-ui-4he
const SearchBar = ({setSearchQuery}) => {
    <form>
        <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
                setSearchQuery(e.target.value);
            }}
            label= "Search"
            variant="outlined"
            size="small"
        />
        <IconButton type="submit" aria-label="search">
            <AiOutlineSearch />
        </IconButton>
    </form>
}

export default SearchBar;