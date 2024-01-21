const { getAll, getByID } = require('../services/accomodationService');

const router = require('express').Router();

router.get('/', (req, res) => {

  const searchedValue = req.query.search || '';
  const rooms = getAll(searchedValue);

  res.render('catalog', {
    title: 'All Accomodation',
    rooms,
    searchedValue
  });
});

router.get('/:id', (req, res) => {
  const roomId = req.params.id;
  const room = getByID(roomId)

  if(room) {
    res.render('details', {
      title: 'Accomodation Details',
      room
    });
  } else {
    res.render('roomNotFound', {
      title: 'Accomodation Details',
      roomId
    });
  }
});

module.exports = router;
