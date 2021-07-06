require('dotenv').config();
const { Router }= require('express');
const axios = require('axios');
const { Recipe, Diet } = require('../db.js')
const { v4: uuidv4 } = require('uuid');
const { Op } = require("sequelize");
const router = Router();
const {
    API_KEY, API_URL, API_URL_ID
  } = process.env;


router.get('/', (req, res, next) => {    
    const name = req.query.name;
    const myDb = Recipe.findAll({ where: { name: {[Op.like]: `%${name}%`} }, include: Diet });
    const api = axios.get(`${API_URL}?query=${name}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`);
    Promise.all([myDb, api])
    .then(results => {
        const [myDbResults, apiResults] = results;
        const response = myDbResults.concat(apiResults.data.results);
        if(response.length === 0) {
            return res.send({ message:'There is no match with your query' });
        }
         return res.send(response);
    })
    .catch(error => next(error));   
});

router.get('/:idReceta', (req, res, next) => {
    const id = req.params.idReceta;    
    const rx = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    let match = id.match(rx);    
    if(match) {
        return Recipe.findByPk(id, { include: Diet })  // si lo pasan como string usar parseInt
        .then(recipe => res.send(recipe))
        .catch(error => next(error));
    }
    axios.get(`${API_URL_ID}/${id}/information?apiKey=${API_KEY}`)
    .then(response => {
        const {title, image, diets, summary, instructions, spoonacularScore, healthScore } = response.data;
        res.send({
            title,
            image,
            diets,
            summary,
            instructions,
            spoonacularScore,
            healthScore
        })
    })
    .catch(error => next(error));  
    
});

router.post('/', (req, res, next) => {
    const recipe = req.body;
    const diets = req.body.diets;   
    console.log('AAAAAA', recipe);
    if(!recipe) res.send('Must send a valid recipe');

    Recipe.create({
             ...recipe,
             id: uuidv4()
                  })
                  .then(recipe => diets && recipe.setDiets(diets))
                  .catch(error => next(error));

     res.send(recipe);    
});


module.exports = router;