import Headers from './components/Header';
import Footer from './components/footer';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/productDetail';
import { useState } from 'react';

function App() {

  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
           
      <Router>
        <div>
           <Headers cartItems={cartItems} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />

         

      </Routes>
        </div>
      </Router>
  
      <Footer />

    </div>
  );
}

export default App;
