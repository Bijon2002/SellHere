import Headers from './components/Header';
import Footer from './components/footer';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/productDetail';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  const [cartItems, setCartItems] = useState([]);
  return (
    <div className="App">
           
      <Router>
        <div>
          <ToastContainer theme='dark' position='top-center' />
           <Headers cartItems={cartItems} />
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
           <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
           <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

         

      </Routes>
        </div>
      </Router>
  
      <Footer />

    </div>
  );
}

export default App;
