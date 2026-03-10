import { Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import ItemSearch from './pages/ItemSearch';
import MarketPrices from './pages/MarketPrices';
import CraftCalc from './pages/CraftCalc';
import PriceHistory from './pages/PriceHistory';
import GoldPrice from './pages/GoldPrice';

function App() {
  return (
    <div className="layout-container">
      <Header />
      <div className="layout-main-area">
        <Sidebar />
        <main className="layout-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/items" element={<ItemSearch />} />
            <Route path="/prices" element={<MarketPrices />} />
            <Route path="/prices/:itemId" element={<MarketPrices />} />
            <Route path="/craft" element={<CraftCalc />} />
            <Route path="/craft/:itemId" element={<CraftCalc />} />
            <Route path="/history" element={<PriceHistory />} />
            <Route path="/history/:itemId" element={<PriceHistory />} />
            <Route path="/gold" element={<GoldPrice />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
