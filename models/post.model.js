'use strict'

module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type:DataTypes.STRING,
        allowNull: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
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

  Post.associate = (models) => {
    Post.belongsTo(models.author,{
      foreignKey: 'authorId',
      OnDelete: 'CASCADE'
    });
  };

  return Post;
}
