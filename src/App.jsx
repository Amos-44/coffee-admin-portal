import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Shop from './components/Shop.jsx';
import AdminPortal from './components/AdminPortal.jsx';
import EditProduct from './components/EditProduct.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </Router>
  );
}

export default App;