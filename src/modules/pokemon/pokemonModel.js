const connection = require("../../config/mysql");

module.exports = {
  createPokemon: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO pokemon SET ?", data, (error, result) => {
        if (!error) {
          const newResult = {
            id: result.insertId,
            ...data,
          };
          resolve(newResult);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
  getPokemon: (id, search, limit, offset) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM pokemon WHERE ${
          id ? `id = '${id}' AND` : ""
        } name LIKE ? LIMIT ? OFFSET ?`,
        [`%${search}%`, limit, offset],
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  getCountPokemon: (id, search) =>
    new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT (*) AS total FROM pokemon WHERE ${
          id ? `id = '${id}' AND` : ""
        } name LIKE ?`,
        [`%${search}%`],
        (error, result) => {
          if (!error) {
            resolve(result[0].total);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
  getPokemonByName: (name) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pokemon WHERE name = ?",
        name,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL : ${error.sqlMessage}`));
          }
        }
      );
    }),
  getPokemonDetailById: (id) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pokemon WHERE id = ?",
        id,
        (error, result) => {
          if (!error) {
            resolve(result);
          } else {
            reject(new Error(`SQL: ${error.sqlMassage}`));
          }
        }
      );
    }),
};
