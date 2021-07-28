const { Router } = require('express');
var express = require('express');
const recipeRoutes = require('./recipes.js');
const dietRoutes = require('./types.js');
// const { Recipe, Diet } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/', (req, res) => {
    res.send('This is the test page of the backend');
});


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.urlencoded());
router.use(express.json()); 
router.use('/recipes', recipeRoutes);
router.use('/types', dietRoutes);


module.exports = router;
