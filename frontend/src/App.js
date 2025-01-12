import {Routes, Route, Navigate} from 'react-router-dom';
import './App.scss';
import { useState } from 'react';
import Navigation from './Routes/Navigation/Navigation.component';
import HomePage from './Routes/HomePage/HomePage.component';

function App() {
  const [fileUpload,setFileUpload] = useState(false)
  const [historyDisplayed,setHistoryDisplayed] = useState(false)
  
  return (
    <Routes>
      <Route path="/" element={<Navigation setFileUpload = {setFileUpload} setHistoryDisplayed = {setHistoryDisplayed}/>}>
        <Route index element={<HomePage fileUpload={fileUpload} setFileUpload={setFileUpload} historyDisplayed = {historyDisplayed} setHistoryDisplayed = {setHistoryDisplayed}/>} />
      </Route>
      
    </Routes>
  );
}

export default App;
