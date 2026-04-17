const express = require('express');
const router = express.Router();
const KategoriController = require('../controllers/kategoriController');

// GET semua kategori
router.get('/', KategoriController.getAll);

// GET kategori by ID
router.get('/:id', KategoriController.getById);

// POST kategori baru
router.post('/', KategoriController.create);

// PUT update kategori
router.put('/:id', KategoriController.update);

// DELETE kategori
router.delete('/:id', KategoriController.delete);

module.exports = router;