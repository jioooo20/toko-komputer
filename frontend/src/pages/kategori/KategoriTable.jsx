import { useState } from 'react';
import toast from 'react-hot-toast';
import KategoriService from '../../services/kategoriService';

const KategoriTable = ({ data, onEdit, onDelete, loading }) => {
    const [deletingId, setDeletingId] = useState(null);

    const handleDelete = async (id, nama) => {
        if (!confirm(`Yakin ingin menghapus kategori "${nama}"?`)) {
            return;
        }
        
        setDeletingId(id);
        
        try {
            await KategoriService.delete(id);
            toast.success(`Kategori "${nama}" berhasil dihapus!`);
            onDelete(id);
        } catch (error) {
            toast.error(error.message || 'Gagal menghapus kategori');
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-base-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-4 text-lg font-semibold">Belum ada kategori</h3>
                <p className="text-base-content/60">Klik "Tambah Kategori" untuk memulai</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Kode</th>
                        <th>Nama Kategori</th>
                        <th>Catatan</th>
                        <th>Dibuat</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id} className="hover">
                            <td>
                                <span className="badge badge-outline">{item.kode}</span>
                            </td>
                            <td>
                                <div className="font-medium">{item.nama}</div>
                            </td>
                            <td>
                                <div className="text-sm text-base-content/70 max-w-xs truncate">
                                    {item.notes || '-'}
                                </div>
                            </td>
                            <td>
                                <div className="text-sm" title={new Date(item.created_at).toLocaleString('id-ID')}>
                                    {formatDate(item.created_at)}
                                </div>
                            </td>
                            <td>
                                <div className="join">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="btn btn-xs btn-outline btn-primary join-item"
                                        title="Edit"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id, item.nama)}
                                        disabled={deletingId === item.id}
                                        className="btn btn-xs btn-outline btn-error join-item"
                                        title="Hapus"
                                    >
                                        {deletingId === item.id ? (
                                            <span className="loading loading-spinner loading-xs"></span>
                                        ) : (
                                            '🗑️'
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default KategoriTable;