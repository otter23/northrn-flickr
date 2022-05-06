'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      */
    return queryInterface.bulkInsert(
      'Images',
      //prettier-ignore
      [
        {userId: 1, title: "Bird1", description: "What a wonderful Bird",imageUrl: "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird2", description: "My favorite bird",imageUrl: "https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird3", description: "Caught this bird just as the sun peaked over the horizon",imageUrl: "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird4", description: "striking eagle",imageUrl: "https://images.pexels.com/photos/36846/bald-eagle-adler-bird-of-prey-raptor.jpg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird5", description: "the cutest litttle ducklet!",imageUrl: "https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird6", description: "It was just posing for me as if it wanted me to take its photo",imageUrl: "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird7", description: "a rare sighting of this owl, I feel like the luckiest person alive",imageUrl: "https://images.pexels.com/photos/2115984/pexels-photo-2115984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird8", description: "Black and Green Toucan on Tree Branch",imageUrl: "https://images.pexels.com/photos/2570085/pexels-photo-2570085.jpeg?auto=compress&cs=tinysrgb&w=2520&h=1500&dpr=1", },
        {userId: 1, title: "Bird9", description: "Puffins basking in the sun on an island",imageUrl: "https://images.pexels.com/photos/2710186/pexels-photo-2710186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 1, title: "Bird10", description: "",imageUrl: "https://images.pexels.com/photos/1543417/pexels-photo-1543417.jpeg?auto=compress&cs=tinysrgb&w=2520&h=1500&dpr=1", },
        {userId: 2, title: "Bird6", description: "It was just posing for me as if it wanted me to take its photo",imageUrl: "https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 2, title: "Bird7", description: "a rare sighting of this owl, I feel like the luckiest person alive",imageUrl: "https://images.pexels.com/photos/2115984/pexels-photo-2115984.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 2, title: "Bird8", description: "Black and Green Toucan on Tree Branch",imageUrl: "https://images.pexels.com/photos/2570085/pexels-photo-2570085.jpeg?auto=compress&cs=tinysrgb&w=2520&h=1500&dpr=1", },
        {userId: 2, title: "Bird9", description: "Puffins basking in the sun on an island",imageUrl: "https://images.pexels.com/photos/2710186/pexels-photo-2710186.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 2, title: "Bird10", description: "",imageUrl: "https://images.pexels.com/photos/1543417/pexels-photo-1543417.jpeg?auto=compress&cs=tinysrgb&w=2520&h=1500&dpr=1", },
        {userId: 3, title: "Bird1", description: "What a wonderful Bird",imageUrl: "https://images.pexels.com/photos/45853/grey-crowned-crane-bird-crane-animal-45853.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 3, title: "Bird2", description: "My favorite bird",imageUrl: "https://images.pexels.com/photos/416179/pexels-photo-416179.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 3, title: "Bird3", description: "Caught this bird just as the sun peaked over the horizon",imageUrl: "https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 3, title: "Bird4", description: "striking eagle",imageUrl: "https://images.pexels.com/photos/36846/bald-eagle-adler-bird-of-prey-raptor.jpg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
        {userId: 3, title: "Bird5", description: "the cutest litttle ducklet!",imageUrl: "https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1500&w=2520", },
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
    return queryInterface.bulkDelete('Images', null, {});
  },
};
