'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        console.log('Encrypting password...')
        user.password = await bcrypt.hash(user.password, saltRounds)
      },
      afterCreate: async (user) => {
        console.log('Create Success!')
      },
    }
  });
  return User;
};