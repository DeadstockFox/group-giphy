//import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function FavMenu() {
    const [favCategory, setFavCategory] = useState([])
    const categories = useSelector(store => store.categories)
    
    return(
        <div>
            <FormControl>
                <InputLabel>Add Category</InputLabel>
                <Select
                    multiple
                    value={favCategory}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {categories.map(cat => {
                        return (
                            <MenuItem key={cat.id} value={cat.name}>
                                <Checkbox checked={favCategory.indexOf(cat.name) > -1} />
                                <ListItemText primary={cat.name} />
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </div>
    )
};

export default FavMenu;