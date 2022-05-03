'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      'Comments',
      [
        { userId: 1, imageId: 1, comment: 'Woooah great shot' },
        { userId: 1, imageId: 1, comment: 'Aaaamazing!' },
        { userId: 2, imageId: 1, comment: 'Right-o, very good!' },
        { userId: 3, imageId: 1, comment: 'Cheers, thanks for sharing!' },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Comments', null, {});
  },
};
