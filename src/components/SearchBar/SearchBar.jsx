import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField } from '@mui/material';


function SearchBar() {
    const dispatch = useDispatch();

    // Sending search term to saga to be used in API request
    const getSearch = (searchTerm) => {
        dispatch({ type: 'FETCH_GIF', payload: searchTerm });
        console.log(searchTerm);
    }

    handleChange = (e) => {
        
    }

    handleSubmit = (e) => {

    }

    return (
        <Box>
            <form onSubmit={handleSubmit}>
                <TextField 
                    type="text"
                    name="searchTerm"
                    value={searchTerm}
                    onChange={handleChange}
                    label="Search"
                    required />
            </form>
        </Box>
    )
}

export default SearchBar;