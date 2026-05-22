const { DataTypes } = require("sequelize");

const sequelize = require("../db");

const Category = sequelize.define("Category", {

  categoryName: {
    type: DataTypes.STRING
  },

  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }

});

module.exports = Category;