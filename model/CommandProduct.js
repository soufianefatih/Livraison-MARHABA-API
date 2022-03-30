module.exports = (db, type) => {
    return db.define("command_products", {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        price: {
            type: type.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: type.INTEGER,
            allowNull: false,
        },
        total: {
            type: type.INTEGER,
            allowNull: false,
        }
    });
};