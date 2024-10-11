import './App.css';
import { Route, Routes } from "react-router-dom";
import "./axios/axiosSetup";
import BeerList from './components/Beer/BeerList';

function App() {
  return (
    <Routes>
      <Route path="/beers" element={<BeerList />} />
    </Routes>
);
}

export default App;
