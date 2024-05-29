const { Item, Bid } = require('../models');
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createItem = [upload.single('image'), async (req, res) => {
    try {
        const { name, description, starting_price, end_time } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;
        const item = await Item.create({ name, description, starting_price, current_price: starting_price, image_url, end_time });
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}];

exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        if (item.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

        const { name, description, starting_price, end_time } = req.body;
        await item.update({ name, description, starting_price, end_time });
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item not found' });
        if (item.userId !== req.user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });

        await item.destroy();
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
