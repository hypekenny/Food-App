const router = require('express').Router();
const { Recipe, Diet } = require('../db.js')


router.get('/', (req, res, next) => {
    Diet.findAll()
    .then(diets => res.send(diets))
    .catch(error => next(error))
});


module.exports = router;