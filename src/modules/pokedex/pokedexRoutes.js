const express = require("express");

const Router = express.Router();

const pokedexController = require("./pokedexController");

Router.post("/create", pokedexController.createPokedex);
Router.patch("/update/:id", pokedexController.updatePokedex);
Router.get("/:id", pokedexController.getPokedexById);
Router.delete("/:name", pokedexController.deletePokedex);

module.exports = Router;
