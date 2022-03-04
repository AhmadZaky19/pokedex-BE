const connection = require("../../config/mysql");

module.exports = {
  createPokedex: (data) =>
    new Promise((resolve, reject) => {
      connection.query("INSERT INTO pokedex SET ?", data, (error, result) => {
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
  getPokedexByName: (name) =>
    new Promise((resolve, reject) => {
      connection.query(
        "SELECT * FROM pokedex WHERE name = ?",
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
  deletePokedex: (name) =>
    new Promise((resolve, reject) => {
      connection.query("DELETE FROM pokedex WHERE name = ?", name, (error) => {
        if (!error) {
          resolve(name);
        } else {
          reject(new Error(`SQL : ${error.sqlMessage}`));
        }
      });
    }),
};
