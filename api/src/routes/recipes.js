const { Router }= require('express');
const router = Router();
const { Recipe } = require('../models/Recipe');
const { Diet } = require('../models/Diet');


router.get('/', (req, res) => {
    res.send('get /recipes');
});

router.get('/', function(req, res) {
    res.send('get idReceta');
});

router.post('/', function(req, res) {
    res.send('post receta');
});


module.exports = router;