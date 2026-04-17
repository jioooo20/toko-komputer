require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// import routes
const kategoriRoutes = require('./routes/kategori');
// const produkRoutes = require('./routes/produk');
// const pelangganRoutes = require('./routes/pelanggan');
// const transaksiRoutes = require('./routes/transaksi');

// impor error hanlder
const errorHandler = require('./middleware/errorHandler');

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// routes
app.use('/api/kategori', kategoriRoutes);
// app.use('/api/produk', produkRoutes);
// app.use('/api/pelanggan', pelangganRoutes);
// app.use('/api/transaksi', transaksiRoutes);

// root endpoint
app.get('/', (req, res) => {
    res.json({ message: 'ready!',
        endpoints:{
            kategori: '/api/kategori',
            // produk: /api/produk, dll
        }
    });
});

// 404 handler
app.use((req, res)=>{
    res.status(404).json({
        success: false,
        error: 'endpoint tidak ditemukan'
    });
});

app.use(errorHandler);
// auto error handling
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Terjadi kesalahan pada server' });
// });

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});