'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.bulkInsert(
      'Albums',
      [
        {
          userId: 1,
          title: 'Album1',
          description: 'A collection of my favorite bird photos',
        },
        { userId: 1, title: 'Album2', description: '' },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.bulkDelete('Albums', null, {});
  },
};
