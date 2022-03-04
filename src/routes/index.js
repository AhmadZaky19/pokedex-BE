const express = require("express");

const Router = express.Router();
const pokedexRoutes = require("../modules/pokedex/pokedexRoutes");

Router.use("/pokedex", pokedexRoutes);

module.exports = Router;
