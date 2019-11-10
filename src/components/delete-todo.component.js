import React, { Component } from 'react';
import axios from 'axios';


export default class DeleteTodo{

    constructor(){
        this.deleteTodo();
    }
    
    deleteTodo(){
        let url = 'http://localhost:4000/todos/delete/';

        axios.delete(url+this.props.todo._id).then(response=>{


        }).catch(err=>{
            console.error(err);
        });

    }


}