import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* otras rutas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;