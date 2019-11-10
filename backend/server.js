const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json);

mongoose.connect('mongodb+srv://desenvolvedor:desenvolvimento123@cluster0-gedzb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB Conexão estabelecida");
});

app.listen(PORT, function(){
    console.log("Servidor rodando na Porta:" + PORT);
});