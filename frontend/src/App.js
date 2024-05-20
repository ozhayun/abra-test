import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePet from './Components/CreatePet'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [pets, setPets] = useState(null);

  useEffect(() => {
    axios.get('/api/pets')
      .then(res => {
        console.log(res.data)
        setPets(res.data)
      })
  }, [])
  const handleCreatePet = (newPet) => {
    console.log("NewPet in App.jxs", newPet)
    axios.post('/api/pet', newPet)
      // .then(res => {
      //   console.log(res.data);
      // })
      .catch(error => console.log("Error while creating new pet", error));
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CreatePet handleCreatePet={handleCreatePet} />}>
        </Route>
        {/* <Route path="/pets" element={<PetsPages />}></Route> */}


      </Routes>


    </BrowserRouter>
  );
}

export default App;
