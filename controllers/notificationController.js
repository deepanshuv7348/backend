const { Notification } = require('../models');

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({ where: { userId: req.user.id } });
        res.json(notifications);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const notifications = await Notification.update({ is_read: true }, { where: { userId: req.user.id, is_read: false } });
        res.json({ message: 'Notifications marked as read' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
