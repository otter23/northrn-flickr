'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },

      description: { type: DataTypes.TEXT },
    },
    {}
  );
  Album.associate = function (models) {
    Album.belongsTo(models.User, { foreignKey: 'userId' });

    const columnMapping = {
      through: 'JoinImageAlbum',
      otherKey: 'imageId',
      foreignKey: 'albumId',
    };

    Album.belongsToMany(models.Image, columnMapping);
  };
  return Album;
};
