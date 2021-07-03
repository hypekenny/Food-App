const router = require('express').Router();
const { Recipe } = require('../models/Recipe');
const { Diet } = require('../models/Diet');


router.get('/', function(req, res) {
    res.send('ruta types');
});


module.exports = router;