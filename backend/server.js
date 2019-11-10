const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = express.Router();
const PORT = 4000;

// Import do Schema do DB
let Todo = require('./todo.model');

app.use(cors());
app.use(bodyParser.json());


// Conectando ao DB
mongoose.connect('mongodb+srv://desenvolvedor:desenvolvimento123@cluster0-gedzb.mongodb.net/todoapp?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB Conexão estabelecida");
});

todoRoutes.get('/', (req, res)=>{
    console.log("Acessado");

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

todoRoutes.post('/update/:id', (req, res)=>{

    Todo.findById(req.params.id, function(err, todo){

        if(!todo){
            res.status(404).send("Data not found");
        }else{

            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo=>{

                res.json('Todo updated!');

            }).catch(err=>{

                res.status(400).send('Update not possible');

            });
        };
    });
});

todoRoutes.delete('/delete/:id', (req, res)=>{

    let id = req.params.id;

    Todo.findById(id, function(err, todo){
        if(!todo){
            res.status(404).send("Not found");
        }else{
            todo.remove().then(todo=>{

                res.json("deleted");

            }).catch(err=>{
                res.status(400).send("Not found");
            })

        }

    });

    Todo.findByIdAndRemove({ id }, function(err){
       
    });

    // Todo.deleteOne(req.params.id, function(err, todo){

    //     if(!todo){
    //         res.status(404).send("Not found id");

    //     }else{
    //         todo.remove().then(todo=>{

    //             res.json("Todo deleted");

    //         }).catch(err=>{
    //             res.status(400).send("Delete not possible!");
    //         })
    //     }
    // });
})
app.use('/todos', todoRoutes);

// Conexão com o servidor sendo estabelecida
app.listen(PORT, function(){
    console.log("Servidor rodando na Porta:" + PORT);
});

