var http = require("http");

var express = require("express");

var bodyParser = require("body-parser");

var app = express() ;
app.use(express. static("./public" ));
app.use(express.json());
app.use(bodyParser. urlencoded({ extended : false}))
app.use(bodyParser. json())
app.set("view engine" , "ejs")
app.set("views", "./views" );

var server = http. createServer (app);
server.listen(80);
console.log('Servidor rodando ...');

app.post('/cadastro' ,function (requisicao , resposta){
    var nome = requisicao. body.nome;
    var nota1 = requisicao. body.nota1;
    var nota2 = requisicao. body.nota2;
    var nota3 = requisicao. body.nota3;
resposta.render('home_lista' , {nome, nota1 , nota2 , nota3})
})