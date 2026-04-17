const pool = require('../config/database');

class KategoriModel {
    
    // GET semua kategori
    static async getAll() {
        try {
            const [rows] = await pool.query(
                `SELECT id, kode, nama, notes, 
                        created_at, updated_at 
                 FROM m_kategori 
                 ORDER BY nama ASC`
            );
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // GET kategori by ID
    static async getById(id) {
        try {
            const [rows] = await pool.query(
                `SELECT id, kode, nama, notes, 
                        created_at, updated_at 
                 FROM m_kategori 
                 WHERE id = ?`,
                [id]
            );
            return rows[0]; // Return single object atau undefined
        } catch (error) {
            throw error;
        }
    }

    // GET kategori by kode (untuk validasi duplicate)
    static async getByKode(kode) {
        try {
            const [rows] = await pool.query(
                'SELECT id, kode FROM m_kategori WHERE kode = ?',
                [kode]
            );
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // POST create kategori baru
    static async create(kategoriData) {
        const { kode, nama, notes } = kategoriData;
        
        try {
            const [result] = await pool.query(
                `INSERT INTO m_kategori (kode, nama, notes) 
                 VALUES (?, ?, ?)`,
                [kode, nama, notes || null]
            );
            
            // Return data yang baru dibuat
            const [newKategori] = await pool.query(
                'SELECT * FROM m_kategori WHERE id = ?',
                [result.insertId]
            );
            
            return newKategori[0];
        } catch (error) {
            throw error;
        }
    }

    // PUT update kategori
    static async update(id, kategoriData) {
        const { kode, nama, notes } = kategoriData;
        
        try {
            const [result] = await pool.query(
                `UPDATE m_kategori 
                 SET kode = ?, nama = ?, notes = ? 
                 WHERE id = ?`,
                [kode, nama, notes, id]
            );
            
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // DELETE kategori
    static async delete(id) {
        try {
            const [result] = await pool.query(
                'DELETE FROM m_kategori WHERE id = ?',
                [id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // Cek apakah kategori punya produk terkait
    static async hasProduk(id) {
        try {
            const [rows] = await pool.query(
                'SELECT COUNT(*) as count FROM m_produk WHERE idkategori = ?',
                [id]
            );
            return rows[0].count > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = KategoriModel;