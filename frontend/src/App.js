import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { useEffect, useState } from 'react';
import Home from './Pages/Home';
import PetsPages from './Pages/PetsPage';

function App() {
  const [pets, setPets] = useState(null);

  useEffect(() => {
    fetchPets();
  }, [])

  const fetchPets = () => {
    axios.get('/api/pets')
      .then(res => {
        console.log(res.data)
        setPets(res.data)
      })
  }

  const handleCreatePet = (newPet) => {
    console.log("NewPet in App.jxs", newPet)
    axios.post('/api/pet', newPet)
      .then(res => {
        setPets([...pets], res.data);
      })
      .catch(error => console.log("Error while creating new pet", error));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home handleCreatePet={handleCreatePet} />}>
        </Route>
        <Route path="/pets" element={<PetsPages pets={pets} />}></Route>
      </Routes>


    </BrowserRouter>
  );
}

export default App;
