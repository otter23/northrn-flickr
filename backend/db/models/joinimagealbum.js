'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinImageAlbum = sequelize.define('JoinImageAlbum', {
    imageId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER
  }, {});
  JoinImageAlbum.associate = function(models) {
    // associations can be defined here
  };
  return JoinImageAlbum;
};