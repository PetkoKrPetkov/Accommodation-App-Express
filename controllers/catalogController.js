const { getAll, getByID } = require('../services/roomService');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const searchedValue = req.query.search || '';
  const city = req.query.city || '';
  const fromPrice = Number(req.query.fromPrice) || 1;
  const toPrice = Number(req.query.toPrice) || 1000;
  
  const rooms = await getAll(searchedValue, city, fromPrice, toPrice);

  res.render('catalog', {
    title: 'All Accomodation',
    rooms,
    searchedValue,
    city,
    fromPrice,
    toPrice,
  });
});

router.get('/:id', async (req, res) => {
  const roomId = req.params.id;
  const room = await getByID(roomId);

  if (room) {
    res.render('details', {
      title: 'Accomodation Details',
      room,
    });
  } else {
    res.render('roomNotFound', {
      title: 'Accomodation Details',
      roomId,
    });
  }
});

module.exports = router;
