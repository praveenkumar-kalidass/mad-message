"use strict";
const uuidv4 = require("uuid/v4");

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("User", [{
      id: uuidv4(),
      first_name: "Tony",
      last_name: "Stark",
      image: "/images/tony-stark.png"
    }, {
      id: uuidv4(),
      first_name: "Steve",
      last_name: "Rogers",
      image: "/images/steve-rogers.jpg"
    }, {
      id: uuidv4(),
      first_name: "Thor",
      last_name: "Odinson",
      image: "/images/thor-odinson.jpg"
    }, {
      id: uuidv4(),
      first_name: "Incredible",
      last_name: "Hulk",
      image: "/images/incredible-hulk.jpg"
    }, {
      id: uuidv4(),
      first_name: "Black",
      last_name: "Widow",
      image: "/images/black-widow.png"
    }, {
      id: uuidv4(),
      first_name: "Hawk",
      last_name: "Eye",
      image: "/images/hawk-eye.png"
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("User", null, {});
  }
};
