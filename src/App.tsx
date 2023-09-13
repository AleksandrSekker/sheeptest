import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Layout from './Layout/Layout';
import SingleProduct from './pages/SingleProduct';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
