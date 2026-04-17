import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import KategoriService from '../../services/kategoriService';

const KategoriForm = ({ kategori, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState({
        kode: '',
        nama: '',
        notes: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const isEditMode = !!kategori;

    useEffect(() => {
        if (kategori) {
            setFormData({
                kode: kategori.kode,
                nama: kategori.nama,
                notes: kategori.notes || ''
            });
        }
    }, [kategori]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        
        if (!formData.kode.trim()) {
            newErrors.kode = 'Kode wajib diisi';
        } else if (!/^[A-Z0-9]+$/.test(formData.kode)) {
            newErrors.kode = 'Kode hanya boleh huruf kapital dan angka';
        }
        
        if (!formData.nama.trim()) {
            newErrors.nama = 'Nama wajib diisi';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validate()) return;
        
        setLoading(true);
        
        try {
            let response;
            if (isEditMode) {
                response = await KategoriService.update(kategori.id, formData);
                toast.success('Kategori berhasil diupdate!');
            } else {
                response = await KategoriService.create(formData);
                toast.success('Kategori berhasil ditambahkan!');
            }
            
            onSuccess(response.data);
            
        } catch (error) {
            if (error.details && error.details.length > 0) {
                // Handle validation errors from backend
                const backendErrors = {};
                error.details.forEach(detail => {
                    if (detail.includes('Kode')) backendErrors.kode = detail;
                    if (detail.includes('Nama')) backendErrors.nama = detail;
                });
                setErrors(backendErrors);
            } else {
                toast.error(error.message || 'Gagal menyimpan kategori');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Kode */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-semibold">
                        Kode <span className="text-error">*</span>
                    </span>
                </label>
                <input
                    type="text"
                    name="kode"
                    value={formData.kode}
                    onChange={handleChange}
                    placeholder="Contoh: CAT001"
                    className={`input input-bordered w-full ${errors.kode ? 'input-error' : ''}`}
                    disabled={isEditMode} // Kode tidak bisa diedit
                />
                {errors.kode && (
                    <label className="label">
                        <span className="label-text-alt text-error">{errors.kode}</span>
                    </label>
                )}
            </div>

            {/* Nama */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-semibold">
                        Nama Kategori <span className="text-error">*</span>
                    </span>
                </label>
                <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Processor"
                    className={`input input-bordered w-full ${errors.nama ? 'input-error' : ''}`}
                />
                {errors.nama && (
                    <label className="label">
                        <span className="label-text-alt text-error">{errors.nama}</span>
                    </label>
                )}
            </div>

            {/* Notes */}
            <div className="form-control w-full">
                <label className="label">
                    <span className="label-text font-semibold">Catatan</span>
                    <span className="label-text-alt">Opsional</span>
                </label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Contoh: Intel dan AMD"
                    className="textarea textarea-bordered w-full h-24"
                />
            </div>

            {/* Actions */}
            <div className="modal-action">
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-ghost"
                    disabled={loading}
                >
                    Batal
                </button>
                <button
                    type="submit"
                    className={`btn btn-primary ${loading ? 'loading' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Menyimpan...' : isEditMode ? 'Update' : 'Simpan'}
                </button>
            </div>
        </form>
    );
};

export default KategoriForm;