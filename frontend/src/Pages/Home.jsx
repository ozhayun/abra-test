import { Button, Container, Box } from "@mui/material";
import CreatePet from '../Components/CreatePet'
import { useNavigate } from 'react-router-dom';

const Home = ({ handleCreatePet }) => {
    const navigate = useNavigate();

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 1,
                    m: 1,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                }}
            >
                <Button variant="contained" onClick={() => navigate('/pets')}>Pets Page</Button>
            </Box>

            <CreatePet handleCreatePet={handleCreatePet} />

        </Container>
    )

}

export default Home;