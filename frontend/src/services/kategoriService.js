import api from './api';

class KategoriService {
    
    // GET semua kategori
    static async getAll() {
        try {
            const response = await api.get('/kategori');
            return response.data;
        } catch (error) {
            throw this.handleError(error,"Gagal memuat data kategori");
        }
    }

    // GET kategori by ID
    static async getById(id) {
        try {
            const response = await api.get(`/kategori/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // POST create kategori
    static async create(data) {
        try {
            const response = await api.post('/kategori', data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // PUT update kategori
    static async update(id, data) {
        try {
            const response = await api.put(`/kategori/${id}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // DELETE kategori
    static async delete(id) {
        try {
            const response = await api.delete(`/kategori/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    }

    // Error handler
    static handleError(error) {
        if (error.response) {
            // Server merespon dengan error
            return {
                message: error.response.data.error || 'Terjadi kesalahan',
                details: error.response.data.details || [],
                status: error.response.status
            };
        } else if (error.request) {
            // Request dibuat tapi tidak ada respons
            return {
                message: 'Tidak dapat terhubung ke server',
                status: 503
            };
        } else {
            // Error lainnya
            return {
                message: error.message || 'Terjadi kesalahan',
                status: 500
            };
        }
    }
}

export default KategoriService;