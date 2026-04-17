import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import KategoriService from '../../services/kategoriService';
import KategoriTable from './KategoriTable';
import KategoriForm from './KategoriForm';
import Modal from '../../components/common/Modal';

const KategoriPage = () => {
    const [kategoriList, setKategoriList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingKategori, setEditingKategori] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchKategori();
    }, []);

    const fetchKategori = async () => {
        setLoading(true);
        try {
            const response = await KategoriService.getAll();
            setKategoriList(response.data || []);
        } catch (error) {
            toast.error(error.message || 'Gagal memuat data kategori');
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingKategori(null);
        setModalOpen(true);
    };

    const handleEdit = (kategori) => {
        setEditingKategori(kategori);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditingKategori(null);
    };

    const handleSuccess = (newData) => {
        if (editingKategori) {
            // Update existing
            setKategoriList(prev =>
                prev.map(item => item.id === newData.id ? newData : item)
            );
        } else {
            // Add new
            setKategoriList(prev => [newData, ...prev]);
        }
        handleCloseModal();
    };

    const handleDelete = (deletedId) => {
        setKategoriList(prev => prev.filter(item => item.id !== deletedId));
    };

    // Filter berdasarkan search
    const filteredData = kategoriList.filter(item =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.kode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold">Kategori Produk</h1>
                    <p className="text-base-content/60 mt-1">
                        Kelola kategori untuk mengorganisir produk
                    </p>
                </div>

                <button
                    onClick={handleCreate}
                    className="btn btn-primary"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Tambah Kategori
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-title">Total Kategori</div>
                    <div className="stat-value text-primary">{kategoriList.length}</div>
                    <div className="stat-desc">Kategori aktif</div>
                </div>

                <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-title">Kategori dengan Produk</div>
                    <div className="stat-value text-secondary">-</div>
                    <div className="stat-desc">Akan diupdate</div>
                </div>

                <div className="stat bg-base-100 rounded-lg shadow">
                    <div className="stat-title">Total Produk</div>
                    <div className="stat-value text-accent">-</div>
                    <div className="stat-desc">Semua kategori</div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="bg-base-100 rounded-lg shadow p-4">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                            </svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Cari berdasarkan kode atau nama..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </label>
                    </div>

                    <button
                        onClick={fetchKategori}
                        className="btn btn-outline"
                        disabled={loading}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-base-100 rounded-lg shadow">
                <KategoriTable
                    data={filteredData}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>

            {/* Modal Form */}
            <Modal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                title={editingKategori ? 'Edit Kategori' : 'Tambah Kategori Baru'}
            >
                <KategoriForm
                    kategori={editingKategori}
                    onSuccess={handleSuccess}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default KategoriPage;