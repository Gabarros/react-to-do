import React from 'react';
import { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';

class App extends Component {

  render() {
    return (

      <Router>
        <Route path="/" exact component={TodosList}/>
        <Route path="/edit/:id" exact component={EditList}/>
        <Route path="/create" exact component={CreateTodo}/>
      </Router>

    );
  }
}
export default App;
