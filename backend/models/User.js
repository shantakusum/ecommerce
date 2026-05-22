const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING
  },

  age: {
    type: DataTypes.INTEGER
  },

  contact_no: {
    type: DataTypes.INTEGER
  },

  email: {
    type: DataTypes.STRING
  },

  password: {
    type: DataTypes.STRING
  },

  address: {
    type: DataTypes.STRING
  }, 

  role: {
    type: DataTypes.STRING
  }
});

module.exports = User;