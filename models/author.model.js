'use strict'

module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type:DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type:DataTypes.STRING,
        allowNull: true
      },
      // Timestamps
      createdAt:{
         type:DataTypes.DATE,
         allowNull: false,
         defaultValue:DataTypes.NOW
       },
      updatedAt: {
        type:DataTypes.DATE,
        allowNull: false,
        defaultValue:DataTypes.NOW
      }
    },
    {
      freezeTableName: true,
      paranoid: true,
    underscored: true
    }
  );

  Author.associate = (models) => {
    Author.hasMany(models.post);
  };

  return Author;
}
