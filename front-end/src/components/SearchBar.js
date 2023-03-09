import React from "react";
import './SearchBar.css';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

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
        <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
    </form>
}

export default SearchBar;