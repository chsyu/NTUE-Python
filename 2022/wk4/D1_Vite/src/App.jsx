import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'
import Tableware from './pages/Tableware'
import Cookware from './pages/Cookware'
import HomeAccessories from './pages/HomeAccessories'
import Lighting from './pages/Lighting'
import Textile from './pages/Textile'
import Furniture from './pages/Furniture'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        
        <Route path="/category/tableware" element={<Tableware />} />
        <Route path="/category/cookware" element={<Cookware />} />
        <Route path="/category/home-accessories" element={<HomeAccessories />} />
        <Route path="/category/lighting" element={<Lighting />} />
        <Route path="/category/textile" element={<Textile />} />
        <Route path="/category/furniture" element={<Furniture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
