/* eslint-disable no-await-in-loop */
const { v4: uuidv4 } = require("uuid");
const helperWrapper = require("../../helpers/wrapper");
const pokedexModel = require("./pokedexModel");

module.exports = {
  createPokedex: async (req, res) => {
    try {
      const { name } = req.body;
      const checkPokedex = await pokedexModel.getPokedexByName(name);
      if (name.length < 1) {
        return helperWrapper.response(res, 400, "Name must be filled", null);
      }

      if (checkPokedex.length > 0) {
        return helperWrapper.response(
          res,
          404,
          `Pokedex with name ${name} already exist`,
          null
        );
      }

      const setData = {
        id: uuidv4(),
        name,
      };

      const result = await pokedexModel.createPokedex(setData);

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
  getPokedexById: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pokedexModel.getPokedexById(id);

      return helperWrapper.response(res, 200, "Success get pokedex", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  updatePokedex: async (req, res) => {
    try {
      const { id } = req.params;
      const checkId = await pokedexModel.getPokedexById(id);
      if (checkId.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Pokedex by id ${id} not found !`,
          null
        );
      }
      const { name } = req.body;
      const setData = {
        name,
        updatedAt: new Date(Date.now()),
      };
      const result = await pokedexModel.updatePokedex(setData, id);
      return helperWrapper.response(res, 200, "Success update pokedex", result);
    } catch (error) {
      return helperWrapper.response(
        res,
        400,
        `Bad request (${error.message})`,
        null
      );
    }
  },
  deletePokedex: async (req, res) => {
    try {
      const { name } = req.params;
      const checkName = await pokedexModel.getPokedexByName(name);
      if (checkName.length < 1) {
        return helperWrapper.response(
          res,
          404,
          `Data by name ${name} not found !`,
          null
        );
      }
      const result = await pokedexModel.deletePokedex(name);
      return helperWrapper.response(
        res,
        200,
        `Success delete pokededx by name ${name}`,
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
