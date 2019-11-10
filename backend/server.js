const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const todoRoutes = express.Router();

app.use(cors());
app.use(bodyParser.json);
app.use('/todos', todoRoutes);

mongoose.connect('mongodb+srv://desenvolvedor:desenvolvimento123@cluster0-gedzb.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB Conexão estabelecida");
});

app.listen(PORT, function(){
    console.log("Servidor rodando na Porta:" + PORT);
});

todoRoutes.get('/', (req, res)=>{
    Todo.find((err, todos)=>{
        if(err){
            console.log(err);
        }else{
            res.json(todos);    }
    });

});

todoRoutes.get('/:id', (req, res)=>{
    let id = req.params.id;

    Todo.findById(id, (err, todo)=>{
        res.json(todo);
    })
});

todoRoutes.post('/add', (req, res)=>{
    let todo = new Todo(req.body);
    todo.save().then(todo =>{
        res.status(200).json({'todo': 'todo added succesfully'});

    }).catch(err=>{
        res.status(400).send('adding new todo failed');
    })
});

// todoRoutes.route('/').get(function(req, res){
//     Todo.find(function(err, todos){
//         if(err){
//             console.log(err);
//         }else{
//             res.json(todos);
//         }
//     })
// })