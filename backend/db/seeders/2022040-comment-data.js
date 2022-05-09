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
      //prettier-ignore
      [
        { userId: 1, imageId: 1, comment: 'Woooah great shot' },
        { userId: 1, imageId: 1, comment: 'Aaaamazing!' },
        { userId: 5, imageId: 1, comment: 'This photos gets me <3' },
        { userId: 4, imageId: 1, comment: 'Teach me your ways!' },
        { userId: 2, imageId: 1, comment: 'Right-o, very good!' },
        { userId: 3, imageId: 1, comment: 'Cheers, thanks for sharing!' },
        { userId: 1, imageId: 2, comment: 'Best shot ever!' },
        { userId: 1, imageId: 3, comment: 'You have a gift my friend' },
        { userId: 2, imageId: 4, comment: 'Whelp you win best photographer award'},
        { userId: 3, imageId: 5, comment: 'Wow so sharp, careful not to cut yourself when handling'},
        { userId: 1, imageId: 6, comment: 'Best shot ever!' },
        { userId: 1, imageId: 7, comment: 'You have a gift my friend' },
        { userId: 2, imageId: 8, comment: 'Whelp you win best photographer award'},
        { userId: 3, imageId: 9, comment: 'Wow so sharp, careful not to cut yourself when handling'},

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
