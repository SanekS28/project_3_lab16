const express = require('express');
const router = express.Router();
const service = require('../../services/apartmentService');

// GET /api/apartments?location=&minPrice=&page=&limit=
router.get('/', async (req, res) => {
    try {
        const { location, minPrice, page = 1, limit = 10 } = req.query;

        const all = await service.getApartments();

        // Фильтрация
        let filtered = all;
        if (location) {
            filtered = filtered.filter(ap => ap.location.toLowerCase().includes(location.toLowerCase()));
        }
        if (minPrice) {
            filtered = filtered.filter(ap => ap.price >= parseFloat(minPrice));
        }

        // Пагинация
        const start = (page - 1) * limit;
        const paginated = filtered.slice(start, start + parseInt(limit));

        res.status(200).json({
            total: filtered.length,
            page: parseInt(page),
            limit: parseInt(limit),
            data: paginated
        });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// GET /api/apartments/:id
router.get('/:id', async (req, res) => {
    try {
        const apartment = await service.getApartmentById(req.params.id);
        if (!apartment) {
            return res.status(404).json({ error: 'Apartment not found' });
        }
        res.status(200).json(apartment);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// POST /api/apartments
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        if (!data.owner || !data.description || !data.price) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        await service.createApartment(data);
        res.status(201).json({ message: 'Apartment created' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create apartment' });
    }
});

// PUT /api/apartments/:id
router.put('/:id', async (req, res) => {
    try {
        const updated = await service.updateApartment(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ error: 'Apartment not found' });
        }
        res.status(200).json({ message: 'Apartment updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update apartment' });
    }
});

// DELETE /api/apartments/:id
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await service.deleteApartment(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Apartment not found' });
        }
        res.status(200).json({ message: 'Apartment deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete apartment' });
    }
});

module.exports = router;
