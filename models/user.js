'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class User extends Model {
    static associate({Post}) {
      // Define associations here if needed
      this.hasMany(Post, {foreignKey: 'userId', as : 'posts'})
    }

    toJSON() {
      return { ...this.get(), id: undefined }; 
    }
  }
  
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, 
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        unique: true, 
        allowNull: false, 
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true, 
    }
  );

  return User;
};
