const http = require('http');
const socketIo = require('socket.io');
const app = require('./app');
const { Item, Bid } = require('./models');
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('bid', async (data) => {
        const { itemId, bid_amount, userId } = data;
        const item = await Item.findByPk(itemId);
        if (bid_amount <= item.current_price) {
            socket.emit('error', 'Bid amount must be higher than the current price');
            return;
        }

        const bid = await Bid.create({ bid_amount, itemId, userId });
        await item.update({ current_price: bid_amount });
        io.emit('update', { itemId, bid_amount });
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
