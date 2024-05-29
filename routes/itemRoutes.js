const express = require('express');
const { getAllItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/itemController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItem);
router.post('/', authenticate, createItem);
router.put('/:id', authenticate, updateItem);
router.delete('/:id', authenticate, deleteItem);

module.exports = router;
