const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('create', {
        title: 'Host a new Accomodation'
    });
});


module.exports = router;
