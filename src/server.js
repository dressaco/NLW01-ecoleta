//import express from 'express'; (JS6)
const express = require('express');
const server = express();

// ligar o servidor
server.listen(3000);

// configurar pasta pública
server.use(express.static('public'));

// pegar o banco de dados
const db = require('./database/db');

// habilitar o uso de req.body na aplicação
server.use(express.urlencoded({ extended: true }));

// utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

// alterar variavel html
server.get('/', (req, res) => {
  return res.render('index.html', {
    title: 'Seu marketplace de coleta de resíduos',
  });
});

server.get('/create-point', (req, res) => {
  // re.query = pega infos de query strings da nossa url
  //console.log(req.query);

  return res.render('create-point.html');
});

server.post('/save-point', (req, res) => {
  // req.body = pega infos do corpo do formulário (tem que habilitar o uso no server)
  //console.log(req.body);

  //inserir dados no bd
  const query = `INSERT INTO places (image,name,address,address2,state,city,items) VALUES (?,?,?,?,?,?,?);`;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.cityname,
    req.body.items,
  ];
  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }
    console.log('Cadastrado com sucesso');
    console.log(this);
    return res.render('create-point.html', { saved: true });
  }

  db.run(query, values, afterInsertData);
});

// pegar os dados do banco de dados
server.get('/search', (req, res) => {
  const search = req.query.search;
  if (search == '') {
    // pesquisa vazia
    return res.render('search-results.html', { total: 0 });
  }
  // LIKE '%${}%' = pesquisa com o item informado em qualquer parte da palavra
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      console.log(err);
      return res.send('Erro no cadastro. Favor contatar o suporte.');
    }
    const total = rows.length;
    //mostrar a pagina html com os dados do bd
    return res.render('search-results.html', { places: rows, total });
  });
});
