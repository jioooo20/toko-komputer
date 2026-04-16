import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
// import ProdukPage from './pages/ProdukPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-base-200">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        {/* <Route path="/produk" element={<ProdukPage />} /> */}
                        {/* Tambah routes lain nanti */}
                    </Routes>
                </main>
                <Toaster position="top-right" />
            </div>
        </Router>
    );
}

export default App;