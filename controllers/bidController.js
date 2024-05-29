const { Bid, Item } = require('../models');

exports.getAllBidsForItem = async (req, res) => {
    try {
        const bids = await Bid.findAll({ where: { itemId: req.params.itemId } });
        res.json(bids);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createBid = async (req, res) => {
    try {
        const { bid_amount } = req.body;
        const item = await Item.findByPk(req.params.itemId);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        if (bid_amount <= item.current_price) return res.status(400).json({ error: 'Bid amount must be higher than the current price' });

        const bid = await Bid.create({ bid_amount, itemId: req.params.itemId, userId: req.user.id });
        await item.update({ current_price: bid_amount });

        res.status(201).json(bid);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
