const Room = require('../models/Room');

function getAll(searchedValue, city, fromPrice, toPrice) {
  return Room.find({}).lean();
}

function getByID(id) {
  return Room.findById(id).populate('facilities', 'label iconUrl').lean();
}

async function create(roomData) {
  const room = {
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

  const result = await Room.create(room)

  return result;
}

module.exports = {
    getAll,
    getByID,
    create
};
