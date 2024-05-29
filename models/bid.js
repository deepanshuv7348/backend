module.exports = (sequelize, DataTypes) => {
    const Bid = sequelize.define('Bid', {
        bid_amount: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    return Bid;
};
