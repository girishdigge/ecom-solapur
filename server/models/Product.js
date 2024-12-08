const sequelize = require('../utils/db.js');
const DataTypes = require('sequelize');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    salePrice: {
      type: DataTypes.INTEGER,
    },
    totalStock: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    tableName: 'products',
  }
);

// Sync the model with the database
Product.sync({ force: false })
  .then(() => {
    console.log('Product model synced with database');
  })
  .catch((err) => {
    console.error('Error syncing Product model:', err);
  });

module.exports = Product;
