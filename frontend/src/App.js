import './App.css';
import CreatePet from './Components/CreatePet'
import axios from 'axios';

function App() {

  const handleCreatePet = (newPet) => {
    console.log("NewPet in App.jxs", newPet)
    axios.post('/api/pet', newPet)
      // .then(res => {
      //   console.log(res.data);
      // })
      .catch(error => console.log("Error while creating new pet", error));
  }
  return (
    <div className="App">
      <CreatePet handleCreatePet={handleCreatePet} />
    </div>
  );
}

export default App;
