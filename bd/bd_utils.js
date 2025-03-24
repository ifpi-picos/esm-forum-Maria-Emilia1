const Database = require('better-sqlite3');

let db = new Database('./bd/esmforum.db', { verbose: console.log });

function reconfig(novo_caminho) {
  db = new Database(novo_caminho, { verbose: console.log });
}

module.exports = {
  reconfig,

  exec(query, params = []) {
    return db.prepare(query).run(...params);
  },

  query(query, params = []) {
    return db.prepare(query).get(...params);
  },

  queryAll(query, params = []) {
    return db.prepare(query).all(...params);
  }
};