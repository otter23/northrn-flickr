'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'demo@user.io',
          username: 'DemoUser',
          hashedPassword: bcrypt.hashSync('password1'),
        },
        {
          email: 'johnA@user.io',
          username: 'JohnJamesAudubon',
          hashedPassword: bcrypt.hashSync('password2'),
        },
        {
          email: 'ansel@user.io',
          username: 'AnselAdams',
          hashedPassword: bcrypt.hashSync('password3'),
        },
        {
          email: 'charles@user.io',
          username: 'CharlesDarwin',
          hashedPassword: bcrypt.hashSync('password4'),
        },
        {
          email: 'johnM@user.io',
          username: 'JohnMuir',
          hashedPassword: bcrypt.hashSync('password5'),
        },
        {
          email: 'david@user.io',
          username: 'DavidAttenborough',
          hashedPassword: bcrypt.hashSync('password6'),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      'Users',
      {
        username: {
          [Op.in]: [
            'DemoUser',
            'JohnJamesAudubon',
            'AnselAdams',
            'CharlesDarwin',
            'JohnMuir',
            'DavidAttenborough',
          ],
        },
      },
      {}
    );
  },
};
