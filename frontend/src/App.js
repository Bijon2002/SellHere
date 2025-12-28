import Headers from './components/Header';
import Footer from './components/footer';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
           
      <Router>
        <div>
           <Headers />
      <Routes>
          <Route path="/" element={<Home />} />

      </Routes>
        </div>
      </Router>
  
      <Footer />

    </div>
  );
}

export default App;
