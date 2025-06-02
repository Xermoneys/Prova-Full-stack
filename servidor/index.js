var http = require("http");

var express = require("express");

var mongodb = require("mongodb")

const uri = "mongodb+srv://luciano:240904lu@projeto.vgvfhxf.mongodb.net/?retryWrites=true&w=majority&appName=Projeto";

const MongoClient = mongodb.MongoClient;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

client.connect().then(() => {
    const dbo = client.db("exemplo_bd"); //conecta no banco de dados
    const usuarios = dbo.collection("usuarios");

app.post('/cadastro', function (requisicao, resposta) {
    const data = {
        nome: requisicao.body.nome,
        nota1: requisicao.body.nota1,
        nota2: requisicao.body.nota2,
        nota3: requisicao.body.nota3
    };

    usuarios.insertOne(data, (err) => {
        if (err) {
            resposta.status(400).json({ success: false, message: "Erro ao cadastrar usuário!" });
        } else {
            resposta.redirect('/lista');
        }
    });
});

app.get('/lista', function (requisicao, resposta) {
    usuarios.find().toArray((err, resultado) => {
        if (err) {
            resposta.status(500).send("Erro ao buscar usuários.");
        } else {
            resposta.render('home_lista', { usuarios: resultado });
        }
    });
});

app.get('/media', function (req, res) {
    const nomeAluno = req.query.aluno_media;

    usuarios.findOne({ nome: nomeAluno }, (err, usuario) => {
        if (err || !usuario) {
            res.render(`resposta_media_erro`, {nome : nomeAluno});
        } else {
            const nota1 = parseFloat(usuario.nota1);
            const nota2 = parseFloat(usuario.nota2);
            const nota3 = parseFloat(usuario.nota3);

            const media = ((nota1 + nota2 + nota3) / 3).toFixed(2);

            res.render('resposta_media_sucesso', { nome: nomeAluno, media: media }); // ✅ Usando EJS
        }
    });
});
});
