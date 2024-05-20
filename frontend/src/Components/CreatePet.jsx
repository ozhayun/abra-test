import React, { useRef, useState } from 'react';
import { Container, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { HexColorPicker, HexColorInput } from "react-colorful";
import './CreatePet.css'
import '../Service/GetTime.js';
import { GetTime } from '../Service/GetTime.js';

const CreatePet = ({ handleCreatePet }) => {
    const formRef = useRef(null);

    const [type, setType] = useState('');
    const [color, setColor] = useState("#aabbcc");

    // Submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(formRef.current)

        const newPet = {
            Name: formData.get('name'),
            Color: color,
            Age: formData.get('age'),
            Type: type,
            Created_At: GetTime()
        }

        handleCreatePet(newPet);
        resetValues(event);
    }

    // Reset form
    const resetValues = (event) => {
        event.target.reset()
        setType('')
        setColor('#aabbcc')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" style={{ marginTop: '20px' }}>Create Pet</Typography>
            <form ref={formRef} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label='name'
                    name='name'
                    placeholder='Name'
                    inputProps={{ maxLength: 20 }}
                >
                </TextField>
                <HexColorPicker color={color}
                    onChange={setColor} />
                <HexColorInput className="colorPicker" color={color} onChange={setColor} />
                <TextField type='number'
                    InputProps={{ inputProps: { min: 0, max: 20 } }}
                    variant="outlined"
                    margin="normal"
                    label="age"
                    name="age"
                    required
                    fullWidth>
                </TextField>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={type}
                        variant="outlined"
                        onChange={(e) => setType(e.target.value)}
                        required
                        label="type"
                        sx={{ textAlign: 'left' }}
                    >
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Horse">Horse</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '24px' }}
                >Add Pet</Button>
            </form>
        </Container>
    )
}

export default CreatePet;