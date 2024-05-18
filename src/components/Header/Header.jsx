import { Link as RouterLink } from 'react-router-dom';
import { Link, Box, Typography } from '@mui/material';

function Header() {
    return (
        <Box 
            display="flex" 
            justifyContent="space-between" 
            alignItems="center" 
            padding={2}
            sx={{ backgroundColor: 'lightgray' }}
        >
            <Typography variant="h4">
                It's "Gif" not "Jif"
            </Typography>
            <Box>
                <Link component={RouterLink} to="/" sx={{ marginRight: 2 }}>
                    Home
                </Link>
                <Link component={RouterLink} to="/favorite">
                    Favorite
                </Link>
            </Box>
        </Box>
    );
}

export default Header;