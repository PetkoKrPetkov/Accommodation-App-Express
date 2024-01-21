const fs = require('fs');

const fileName = './models/data.json';

const data = JSON.parse(fs.readFileSync(fileName));

async function persist() {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
      if (err == null) {
        resolve();
      } else {
        reject(err);
      }
    });
  });
}

function getAll(searchedValue, city, fromPrice, toPrice) {
  searchedValue = searchedValue.toLowerCase();
  return data
    .filter(
      (room) =>
        room.name.toLowerCase().includes(searchedValue) ||
        room.description.toLowerCase().includes(searchedValue)
    )
    .filter((room) => room.city.toLowerCase().includes(city.toLowerCase()))
    .filter((room) => room.price >= fromPrice && room.price <= toPrice);
}

function getByID(id) {
  return data.find((i) => i.id == id);
}

async function create(roomData) {
  const room = {
    id: getId(),
    name: roomData.name,
    description: roomData.description,
    city: roomData.city,
    beds: Number(roomData.beds),
    price: Number(roomData.price),
    imgURL: roomData.imgURL,
  };

  const missingValues = Object.entries(room).filter(([key, value]) => !value);
  if (missingValues.length > 0) {
    throw new Error(
      missingValues.map((m) => `${m[0]} is required!`).join('\n')
    );
  }

  data.push(room);
  await persist();

  return room;
}

function getId() {
  return ('000000' + ((Math.random() * 999999) | 0).toString(16)).slice(-6);
}

module.exports = {
  getAll,
  getByID,
  create,
};
