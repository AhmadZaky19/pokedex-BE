const { v4: uuidv4 } = require("uuid");
const helperWrapper = require("../../helpers/wrapper");
const pokemonModel = require("./pokemonModel");

module.exports = {
  createPokemon: async (req, res) => {
    try {
      const { name, pokedexId, type } = req.body;
      let { evolutionFrom } = req.body;
      evolutionFrom = evolutionFrom || null;
      const checkPokemon = await pokemonModel.getPokemonByName(name);
      if (name.length < 1 || pokedexId.length < 1 || type.length < 1) {
        return helperWrapper.response(res, 400, "Inputs must be filled", null);
      }
      if (checkPokemon.length > 0) {
        return helperWrapper.response(
          res,
          404,
          `Pokemon with name ${name} already exist`,
          null
        );
      }
      const setData = {
        id: uuidv4(),
        name,
        pokedexId,
        type,
        evolutionFrom,
      };
      const result = await pokemonModel.createPokemon(setData);
      return helperWrapper.response(res, 200, "Success create pokedex", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getPokemon: async (req, res) => {
    try {
      let { id, search, page, limit } = req.query;
      id = id || "";
      search = search || "";
      page = Number(page) || 1;
      limit = Number(limit) || 3;
      const offset = page * limit - limit;
      const totalData = await pokemonModel.getCountPokemon(id, search);
      const totalPage = Math.ceil(totalData / limit);
      const pageInfo = {
        page,
        totalPage,
        limit,
        totalData,
      };
      const result = await pokemonModel.getPokemon(id, search, limit, offset);
      if (result.length < 1) {
        return helperWrapper.response(res, 200, "Pokemon not found", result);
      }
      if (page > totalPage) {
        return helperWrapper.response(res, 400, "Page not found", null);
      }
      return helperWrapper.response(
        res,
        200,
        "Success get pokemon",
        result,
        pageInfo
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  getPokemonDetailById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pokemonModel.getPokemonDetailById(id);
      if (result.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Pokemon by id ${id} not found !`,
          null
        );
      }
      return helperWrapper.response(
        res,
        200,
        "Success get pokemon by id",
        result
      );
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
};
