require('dotenv/config');

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(coes());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

// routes
app.get('/', (req, res) => {
    res.json({ message: 'ready!'});
});

// import routes
const pelangganRoutes = require('./routes/pelanggan');
const kategoriRoutes = require('./routes/kategori');
const produkRoutes = require('./routes/produk');
const transaksiRoutes = require('./routes/transaksi');

// use routes
app.use('/api/pelanggan', pelangganRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/produk', produkRoutes);
app.use('/api/transaksi', transaksiRoutes);

// auto error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Terjadi kesalahan pada server' });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});