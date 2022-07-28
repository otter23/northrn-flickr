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
        {userId: 1, title: "Owl", description: "Owl",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/ahmed-badawy-R4-DtoeKcHA-unsplash.jpg", },
        {userId: 2, title: "Toucan", description: "Majestic Toucan",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/akhila-katuri-Jtbc29Cfo2Q-unsplash.jpg", },
        {userId: 3, title: "Parrot", description: "Colorful Parrot",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/andrew-pons-lylCw4zcA7I-unsplash.jpg", },
        {userId: 4, title: "Barn Owl", description: "Sleepy barn owl",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/andy-holmes-oBxYg1kDLAE-unsplash.jpg", },
        {userId: 5, title: "Sparrow", description: "Sparrow",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/aniket-solankar-Eb_2ItJvcI8-unsplash.jpg", },
        {userId: 6, title: "Hummingbird", description: "Hummingbird perched on flower stem",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/benjamin-wong-So_VMm4YqLY-unsplash.jpg", },
        {userId: 1, title: "Kingfisher", description: "Majestic kingfisher",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/boris-smokrovic-DPXytK8Z59Y-unsplash.jpg", },
        {userId: 2, title: "Yellow Bird", description: "Plump yellow bird posing in the sun",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/boris-smokrovic-RLLR0oRz16Y-unsplash.jpg", },
        {userId: 3, title: "Falcon", description: "Closeup side view of falcon with orange eye",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/brandon-zYOKCGOSHME-unsplash.jpg", },
        {userId: 4, title: "Birds Court", description: "Colorful birds courting each other",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/david-clode-3YEMFXYBgu8-unsplash.jpg", },
        {userId: 5, title: "Blue Bird", description: "The bluest bird i've ever seen",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/deepak-nautiyal-Nbv7PkL_rvI-unsplash.jpg", },
        {userId: 6, title: "Blue Parrot", description: "Bue parrot from the backside",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/dominik-lange-BFsm5vldl2I-unsplash.jpg", },
        {userId: 1, title: "King Fisher", description: "Banded king fischer with fish in mouth",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/dorothea-oldani-taPsJHnNJ_8-unsplash.jpg", },
        {userId: 2, title: "Yellow Grey Bird", description: "Chubby yellow and grey bird",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/fabio-sasso--xQ9hEM5QMo-unsplash.jpg", },
        {userId: 3, title: "Ring-Necked Pheasant", description: "Colorful chicken like bird",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/hans-veth-V4ayVSp3XZo-unsplash.jpg", },
        {userId: 4, title: "Peacock", description: "Male peacock in full plumage",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/hans-veth-XYFpx1ErGOU-unsplash.jpg", },
        {userId: 5, title: "Sparrow", description: "Small sparrow posing on wheat stock singing",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/hans-veth-vyQgv-eURTU-unsplash.jpg", },
        {userId: 6, title: "European Robin", description: "European robin  fluffing its feathers",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/hristina-eftimova-FZf9QOfhkGU-unsplash.jpg", },
        {userId: 1, title: "Yellow Finch", description: "Yellow finch amongst some white flowers",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/jeremy-hynes-Lv_bMRV5xz4-unsplash.jpg", },
        {userId: 2, title: "Robin", description: "Robin looking off into the distance",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/john-mcmahon-yAs0jN_8VGM-unsplash.jpg", },
        {userId: 3, title: "Lilac-Breasted Roller", description: "Lilac-breasted roller perched on a dead log",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/laya-clode-yvU_V6o3nCw-unsplash.jpg", },
        {userId: 4, title: "Blue Brown Bird", description: "Blue and brown bird facing sideways",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/madiba-de-african-inspiration-aXe4Ufe3IV4-unsplash.jpg", },
        {userId: 5, title: "Northern Flicker", description: "Northern Flicker in the snow",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/mark-olsen-caM2RdHVAoc-unsplash.jpg", },
        {userId: 6, title: "Flamingoes", description: "Flamingoes at dusk",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/marko-blazevic-hcVtC5pgZTY-unsplash.jpg", },
        {userId: 1, title: "Northern Cardinal", description: "Northern Cardinal perched on a twig",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/mary-kapka-4rOvHZhxqXo-unsplash.jpg", },
        {userId: 2, title: "Finch", description: "Finch on their nest",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/mathew-schwartz-5iFZBM7qgWc-unsplash.jpg", },
        {userId: 3, title: "Black-Billed Magpie", description: "Black-billed Magpie hanging in a thicket",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/natasha-miller-DFCnzrSYqpQ-unsplash.jpg", },
        {userId: 4, title: "Barred Owl", description: "Beautiful Barred owl perched in the afternoon",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/philip-brown-16TAZQOPKyo-unsplash.jpg", },
        {userId: 5, title: "Barred Owl", description: "Beautiful Barred owl watching its prey",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/philip-brown-CZi-9nISUIs-unsplash.jpg", },
        {userId: 6, title: "Hummingbird", description: "Hummingbird's iridescent colors on display",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/philip-brown-EinKdyLyK98-unsplash.jpg", },
        {userId: 1, title: "Sea Gull", description: "Sea Gull checking out my camera",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/photoholgic-KZ7NrLvWQkw-unsplash.jpg", },
        {userId: 2, title: "Condor", description: "Caputred this condor in the andes",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/photos-by-beks-X_focRRR0Uw-unsplash.jpg", },
        {userId: 3, title: "Pidgeons", description: "Pigeons on a colorful roof in Thailand",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/prashant-saini-5RiMmxSeM4k-unsplash.jpg", },
        {userId: 4, title: "Crested Bird", description: "Funny crested bird",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/rae-wallis-NLsl8Rp1mvI-unsplash.jpg", },
        {userId: 5, title: "Atlantic Puffin", description: "Atlantic puffin closeup",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/ray-hennessy-mpw37yXc_WQ-unsplash.jpg", },
        {userId: 6, title: "Bald Eagle", description: "Bald eagle landing at their nest",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/richard-lee-MLfe9XFhFwk-unsplash.jpg", },
        {userId: 1, title: "Mountain Quail", description: "Mountain Quail posing on a log",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/richard-lee-WOY8h-olonY-unsplash.jpg", },
        {userId: 2, title: "Owl", description: "Black and white owl was hard to find",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/richard-lee-l3Kd91RNcd8-unsplash.jpg", },
        {userId: 3, title: "Owl", description: "Owl in mid flight",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/richard-lee-xWQcud4Xtr4-unsplash.jpg", },
        {userId: 4, title: "Hummingbird", description: "Hummingbird closeup ",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/rick-j-brown-aJtTBOSwsXg-unsplash.jpg", },
        {userId: 5, title: "Carolina Wren", description: "Carolina Wren singing their song",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/ryk-naves-b_-KVgWg_YM-unsplash.jpg", },
        {userId: 6, title: "Mallard", description: "Male mallard duck quacking along",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/sarka-krnavkova-F4RmUBqQhu4-unsplash.jpg", },
        {userId: 1, title: "Swan", description: "Swan and their reflection in a pond",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/sarka-krnavkova-aX70g2vvvr8-unsplash.jpg", },
        {userId: 2, title: "Finch", description: "Speckled finch posing on a fence",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/seth-yeanoplos-wON3EQo7FyI-unsplash.jpg", },
        {userId: 3, title: "Peacock", description: "Male peackock with feathers on display",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/steve-harvey-_7S3tOs424o-unsplash.jpg", },
        {userId: 4, title: "Goose", description: "Goose in flight on migration south",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/vincent-van-zalinge-XBvSGTbAI7s-unsplash.jpg", },
        {userId: 5, title: "Great Blue Heron", description: "Great Blue Heron in flight",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/william-foley-EysCLgycVgc-unsplash.jpg", },
        {userId: 6, title: "Stork", description: "Stork in the sky",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/wynand-uys-Vkau25v1L5Q-unsplash.jpg", },
        {userId: 1, title: "Black-bellied whistling-duck", description: "Black-bellied whistling-duck walking down the runway",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/yoksel-zok-Vo8R94my8_8-unsplash.jpg", },
        {userId: 2, title: "Penguins", description: "penguins congretating on some rocks",imageUrl: "https://northrn-flickr.s3.us-west-1.amazonaws.com/yomex-owo-TtQm-1ra4IU-unsplash.jpg", },
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
