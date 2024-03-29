const homeController = require('../controllers/homeController');
const defaultController = require('../controllers/defaultController');
const catalogController = require('../controllers/catalogController');
const createController = require('../controllers/createController');
const facilityController = require('../controllers/facilityController');

module.exports = (app) => {
  app.use(homeController);
  app.use('/catalog', catalogController);
  app.use('/create', createController);
  app.use('/facility',  facilityController);

  // you must write all controllers and then the default controller
  app.all('*', defaultController);
};
