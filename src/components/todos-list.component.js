import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Todo = props => (
    <tr>
        <td> {props.todo.todo_description} </td>
        <td> {props.todo.todo_responsible} </td>
        <td> {props.todo.todo_priority} </td>
        <td>
            <Link to={"/edit/" + props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    constructor(props) {

        super(props);

        this.state = { todos: [] };
    }

    componentDidMount() {
        let url = 'http://localhost:4000/todos/';

        axios.get(url).then(response => {

            this.setState({ todos: response.data });

        }).catch(err => {

            console.error(err);

        });
    }

    todoList() {
        return this.state.todos.map(function (currentTodo, i) {

            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {

        return (
            <div>
                <h3>Todos List</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>
                        {this.todoList()}
                    </tbody>
                </table>
            </div>
        )
    }
}