'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.bulkInsert(
      'JoinImageAlbums',
      [
        { imageId: 1, albumId: 1 },
        { imageId: 2, albumId: 1 },
        { imageId: 3, albumId: 1 },
        { imageId: 4, albumId: 1 },
        { imageId: 5, albumId: 1 },
        { imageId: 6, albumId: 2 },
        { imageId: 7, albumId: 2 },
        { imageId: 8, albumId: 2 },
        { imageId: 9, albumId: 2 },
        { imageId: 10, albumId: 2 },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.bulkDelete('JoinImageAlbums', null, {});
  },
};
