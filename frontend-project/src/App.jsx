// App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import MenuBar from './components/MenuBar';
import CarPage from './pages/CarPage';
import PackagePage from './pages/PackagePage';
import ServicePackage from './pages/ServicePackage';

function App() {
  const location = useLocation();
  const showMenu = location.pathname !== '/'; // hide menu on login

  return (
    <div className="flex">
      <div className="flex-grow p-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/CarPage" element={<CarPage />} />
          <Route path="/PackagePage" element={<PackagePage />} />
          <Route path="/ServicePackage" element={<ServicePackage />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
