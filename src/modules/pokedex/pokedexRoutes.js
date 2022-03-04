const express = require("express");

const Router = express.Router();

const pokedexController = require("./pokedexController");

Router.post("/create", pokedexController.createPokedex);
Router.delete("/:name", pokedexController.deletePokedex);

module.exports = Router;
