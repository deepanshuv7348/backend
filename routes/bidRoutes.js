const express = require('express');
const { getAllBidsForItem, createBid } = require('../controllers/bidController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:itemId/bids', getAllBidsForItem);
router.post('/:itemId/bids', authenticate, createBid);

module.exports = router;
