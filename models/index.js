const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user')(sequelize, Sequelize);
const Item = require('./item')(sequelize, Sequelize);
const Bid = require('./bid')(sequelize, Sequelize);
const Notification = require('./notification')(sequelize, Sequelize);

User.hasMany(Bid);
User.hasMany(Notification);
Item.hasMany(Bid);
Bid.belongsTo(User);
Bid.belongsTo(Item);
Notification.belongsTo(User);

module.exports = {
    User,
    Item,
    Bid,
    Notification,
    sequelize
};
