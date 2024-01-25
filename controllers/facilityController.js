const { createFacility } = require('../services/facilityService');

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

module.exports = facilityController;
