const router = require('express').Router();

const apiRoutes = require('./api/api-index');

router.use('/api', apiRoutes);

router.use((req, res) => res.status(404).send('Wrong route!'));

module.exports = router;