import logo from './logo.svg';
import './App.css';

import {BrowserRouter, Route, Routes} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Main from './Component.jsx/Main';
import Rigester from './Component.jsx/Rigester';
import ShowUser from './Component.jsx/ShowUser';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/reg' element={<Rigester/>}/>
      <Route path='/get' element={<ShowUser/>}/>

    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;