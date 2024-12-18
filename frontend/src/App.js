import {Routes, Route, Navigate} from 'react-router-dom';
import './App.scss';

import Navigation from './Routes/Navigation/Navigation.component';
import HomePage from './Routes/HomePage/HomePage.component';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation/>}>
        <Route index element={<HomePage/>} />
      </Route>
      
    </Routes>
  );
}

export default App;
