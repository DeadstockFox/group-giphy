import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField } from '@mui/material';
import { useState } from "react";

function SearchBar() {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState("");

    // Sending search term to saga to be used in API request
    const getSearch = (searchTerm) => {
        dispatch({ type: 'FETCH_GIF', payload: searchTerm });
        console.log(searchTerm);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'FETCH_GIF', payload: searchTerm });
        console.log(searchTerm);
    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField 
                    type="text"
                    name="searchTerm"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                    }}
                    label="Search"
                    required />
                <Button 
                    type="submit"
                    variant="contained">
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default SearchBar;