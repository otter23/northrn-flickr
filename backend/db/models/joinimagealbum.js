'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinImageAlbum = sequelize.define(
    'JoinImageAlbum',
    {
      imageId: { type: DataTypes.INTEGER, allowNull: false },
      albumId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  JoinImageAlbum.associate = function (models) {
    // associations can be defined here
  };
  return JoinImageAlbum;
};
