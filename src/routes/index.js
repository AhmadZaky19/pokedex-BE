const express = require("express");

const Router = express.Router();
const pokedexRoutes = require("../modules/pokedex/pokedexRoutes");
const pokemonRoutes = require("../modules/pokemon/pokemonRoutes");

Router.use("/pokedex", pokedexRoutes);
Router.use("/pokemon", pokemonRoutes);

module.exports = Router;
