const { createFacility, getAllFacilities, addFacilities } = require('../services/facilityService');
const { getByID } = require('../services/roomService');

const facilityController = require('express').Router();

facilityController.get('/create', (req, res) => {
  res.render('createFacility', {
    title: 'Create New Facility',
  });
});

facilityController.post('/create', async (req, res) => {
  console.log(req.body);

  try {
    await createFacility(req.body.label, req.body.iconURL);
    res.redirect('/catalog');
  } catch (err) {
    res.render('createFacility', {
      title: 'Create New Facility',
      error: err.message,
    });
  }
});

facilityController.get('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId;
    const room  = await getByID(roomId);
    const facilities = await getAllFacilities();
    facilities.forEach(f => {
        if((room.facilities || []).some(id => id.toString() == f._id.toString())) {
            f.checked = true;
        }
    })

    res.render('decorate', {
        title: 'Add Facility',
        room,
        facilities
    });
});

facilityController.post('/:roomId/decorateRoom', async (req, res) => {
    const roomId = req.params.roomId
    await addFacilities(roomId, Object.keys(req.body));

    res.redirect('/facility/' + roomId + '/decorateRoom')
});

module.exports = facilityController;
