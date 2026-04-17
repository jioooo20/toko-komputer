const KategoriModel = require('../models/kategoriModel');

class KategoriController {
    
    // GET /api/kategori
    static async getAll(req, res, next) {
        try {
            const kategori = await KategoriModel.getAll();
            
            res.json({
                success: true,
                data: kategori,
                total: kategori.length
            });
        } catch (error) {
            next(error); // Lempar ke error handler middleware
        }
    }

    // GET /api/kategori/:id
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            
            const kategori = await KategoriModel.getById(id);
            
            if (!kategori) {
                return res.status(404).json({
                    success: false,
                    error: 'Kategori tidak ditemukan'
                });
            }
            
            res.json({
                success: true,
                data: kategori
            });
        } catch (error) {
            next(error);
        }
    }

    // POST /api/kategori
    static async create(req, res, next) {
        try {
            const { kode, nama, notes } = req.body;
            
            // ===== VALIDASI =====
            const errors = [];
            
            if (!kode) errors.push('Kode wajib diisi');
            if (!nama) errors.push('Nama wajib diisi');
            
            // Validasi format kode (opsional)
            if (kode && !/^[A-Z0-9]+$/.test(kode)) {
                errors.push('Kode hanya boleh huruf kapital dan angka');
            }
            
            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Validasi gagal',
                    details: errors
                });
            }
            
            // ===== CEK DUPLIKAT KODE =====
            const existingKode = await KategoriModel.getByKode(kode);
            if (existingKode) {
                return res.status(409).json({
                    success: false,
                    error: 'Kode kategori sudah digunakan'
                });
            }
            
            // ===== SIMPAN KE DATABASE =====
            const newKategori = await KategoriModel.create({ 
                kode, 
                nama, 
                notes 
            });
            
            res.status(201).json({
                success: true,
                message: 'Kategori berhasil ditambahkan',
                data: newKategori
            });
            
        } catch (error) {
            // Handle duplicate entry error dari MySQL
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    success: false,
                    error: 'Kode kategori sudah ada'
                });
            }
            next(error);
        }
    }

    // PUT /api/kategori/:id
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const { kode, nama, notes } = req.body;
            
            // Validasi
            if (!kode || !nama) {
                return res.status(400).json({
                    success: false,
                    error: 'Kode dan nama wajib diisi'
                });
            }
            
            // Cek apakah kategori ada
            const existing = await KategoriModel.getById(id);
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    error: 'Kategori tidak ditemukan'
                });
            }
            
            // Update
            const updated = await KategoriModel.update(id, { kode, nama, notes });
            
            if (updated) {
                const updatedData = await KategoriModel.getById(id);
                res.json({
                    success: true,
                    message: 'Kategori berhasil diupdate',
                    data: updatedData
                });
            }
            
        } catch (error) {
            next(error);
        }
    }

    // DELETE /api/kategori/:id
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            
            // Cek apakah kategori ada
            const existing = await KategoriModel.getById(id);
            if (!existing) {
                return res.status(404).json({
                    success: false,
                    error: 'Kategori tidak ditemukan'
                });
            }
            
            // Cek apakah ada produk terkait
            const hasProduk = await KategoriModel.hasProduk(id);
            if (hasProduk) {
                return res.status(400).json({
                    success: false,
                    error: 'Kategori tidak bisa dihapus karena masih memiliki produk'
                });
            }
            
            const deleted = await KategoriModel.delete(id);
            
            if (deleted) {
                res.json({
                    success: true,
                    message: 'Kategori berhasil dihapus'
                });
            }
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = KategoriController;