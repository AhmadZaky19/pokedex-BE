const express = require("express");

const Router = express.Router();

const pokemonController = require("./pokemonController");

Router.post("/create", pokemonController.createPokemon);
Router.get("/", pokemonController.getPokemon);
Router.get("/:id", pokemonController.getPokemonDetailById);

module.exports = Router;
