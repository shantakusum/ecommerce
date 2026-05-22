const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define("Product", {
  category: {
    type: DataTypes.STRING
  },

  title: {
    type: DataTypes.STRING
  },

  price: {
    type: DataTypes.INTEGER
  },

  image: {
    type: DataTypes.STRING
  },

  description: {
    type: DataTypes.STRING
  }
  
});

module.exports = Product;