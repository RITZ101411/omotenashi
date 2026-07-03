import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/MapPage';
import SpotPostPage from './pages/SpotPostPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/map" replace />} />
          <Route path="/map" element={<HomePage />} />
          <Route path="/post" element={<SpotPostPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
