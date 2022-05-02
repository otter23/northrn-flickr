'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 100],
        },
      },
      description: { type: DataTypes.TEXT },

      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
    },
    {}
  );
  Image.associate = function (models) {
    Image.belongsTo(models.User, { foreignKey: 'userId' });
    Image.hasMany(models.Comment, { foreignKey: 'imageId' });

    const columnMapping2 = {
      through: 'JoinImageAlbum',
      otherKey: 'albumId',
      foreignKey: 'imageId',
    };

    Image.belongsToMany(models.Album, columnMapping2);
  };
  return Image;
};
