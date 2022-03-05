const express = require("express");

const Router = express.Router();

const pokemonController = require("./pokemonController");

Router.post("/create", pokemonController.createPokemon);
// Router.get("/get", pokemonController.getPokemon);`

module.exports = Router;
