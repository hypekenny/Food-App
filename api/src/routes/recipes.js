require("dotenv").config();
const { Router } = require("express");
const axios = require("axios");
const { Recipe, Diet } = require("../db.js");
const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");
const router = Router();
const { API_KEY, API_URL, API_URL_ID, API_KEY2, API_KEY3, API_KEY4, API_KEY5 } =
  process.env;
const llave = API_KEY || API_KEY2 || API_KEY3 || API_KEY4 || API_KEY5;

router.get("/", (req, res, next) => {
  const name = req.query.name;
  const myDb = Recipe.findAll({
    where: { title: { [Op.like]: `%${name}%` } },
    include: Diet,
  });
  const api = axios.get(
    `${API_URL}?query=${name}&number=40&addRecipeInformation=true&apiKey=${llave}`
  );
  Promise.all([myDb, api])
    .then((results) => {
      const [myDbResults, apiResults] = results;
      const response = myDbResults.concat(apiResults.data.results);
      if (response.length === 0) {
        return res.send({ message: "There is no match with your query" });
      }
      return res.send(response);
    })
    .catch((error) => next(error));
});

router.get("/:idReceta", (req, res, next) => {
  const id = req.params.idReceta;
  const rx = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  let match = id.match(rx);
  if (match) {
    return Recipe.findByPk(id, { include: { model: Diet } })
      .then((recipe) => res.send(recipe))
      .catch((error) => next(error));
  }
  axios
    .get(`${API_URL_ID}/${id}/information?apiKey=${llave}`)
    .then((response) => {
      const {
        title,
        image,
        diets,
        summary,
        instructions,
        spoonacularScore,
        healthScore,
      } = response.data;
      res.send({
        title,
        image,
        diets,
        summary,
        instructions,
        spoonacularScore,
        healthScore,
      });
    })
    .catch((error) => res.send({ message: error }));
});

router.post("/", async (req, res, next) => {
  const { title, spoonacularScore, healthScore, summary, instructions } =
    req.body;
  const diets = req.body.diets;
  var d = diets.map((e) => parseInt(e));

  try {
    let newRecipe = await Recipe.create({
      title,
      spoonacularScore,
      healthScore,
      summary,
      instructions,
      id: uuidv4(),
    });

    d.map(async (d) => await newRecipe.setDiets(d));

    res.send(newRecipe);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
