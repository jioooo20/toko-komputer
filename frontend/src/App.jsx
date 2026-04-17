import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Layout/Navbar';
import Dashboard from './pages/Dashboard';
import KategoriPage from './pages/kategori';
import ProdukPage from './pages/produk';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-base-200">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/kategori" element={<KategoriPage />} />
                        <Route path="/produk" element={<ProdukPage />} />
                        {/* Tambah routes lain nanti */}
                    </Routes>
                </main>
                <Toaster 
                    position="top-right"
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#363636',
                            color: '#fff',
                        },
                        success: {
                            duration: 3000,
                            iconTheme: {
                                primary: '#10b981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            duration: 4000,
                            iconTheme: {
                                primary: '#ef4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </div>
        </Router>
    );
}

export default App;