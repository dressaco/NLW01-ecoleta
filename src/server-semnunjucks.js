//import express from 'express'; (JS6)
const express = require('express');
const server = express();

// ligar o servidor
server.listen(3000);

//configurar pasta pública
server.use(express.static('public'));

//configurar caminhos da aplicação
//get: Obter rota/caminho | req: Requisição | res: Resposta

//página inicial
server.get('/', (req, res) => {
  // __dirname - dá o nome do diretório, caminho do arquivo server.js
  res.sendFile(__dirname + '/views/index.html');
});

server.get('/create-point', (req, res) => {
  // __dirname - dá o nome do diretório, caminho do arquivo server.js
  res.sendFile(__dirname + '/views/create-point.html');
});

server.get('/search-results', (req, res) => {
  // __dirname - dá o nome do diretório, caminho do arquivo server.js
  res.sendFile(__dirname + '/views/search-results.html');
});
