// importar a dependencia do sqlite3

// import sqlite3 from 'sqlite3';
const sqlite3 = require('sqlite3').verbose();

// criar o objeto que irá fazer operações no banco de dados
//const db = {property: 'value'};
const db = new sqlite3.Database('./src/database/database.db');

module.exports = db;
// utilizar o objeto de banco de dados para nossas operações
db.serialize(() => {
  // criar tabela (utilizando comandos SQL)
  db.run(`
    CREATE TABLE IF NOT EXISTS places (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      name TEXT,
      address TEXT,
      address2 TEXT,
      state TEXT,
      city TEXT,
      items TEXT
    );
`);
  // inserir dados na tabela (utilizando comandos SQL)
  /*const query = `INSERT INTO places (image,name,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`;
  const values = [
    'https://casagrandeaz.gov/wp-content/uploads/2017/03/24229486_m-1.jpg',
    'colectoria',
    'avenida guilherme',
    'nº 450',
    'SC',
    'Rio do Sul',
    'Lâmpadas',
   ];
  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Cadastrado com sucesso');
    console.log(this);
  }
  db.run(query, values, afterInsertData); */
  // consultar dados da tabela (utilizando comandos SQL)
  /*   db.all(`SELECT NAME FROM places`, function (err, rows) {
    if (err) {
      return console.log(err);
    }
    console.log('Aqui estão seus registros');
    console.log(rows);
  }); */
  // deletar dados da tabela (utilizando comandos SQL)
  /*   db.run(`DELETE FROM places WHERE id = ?`, [5], function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Registro deletado com sucesso!');
  }); */
  // alterar dados da tabela (utilizando comandos SQL)
});
