import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';

import HomePage from './HomePage'
import PostDetailPage from './PostDetailPage'
import CategoryPage from './CategoryPage'

class App extends Component {

  render() {
    return (
      <div className="app">
        <h1 className="app-header">Readables</h1>
        <hr />
        <Route exact path="/" component={HomePage} />
        <Route exact path="/:path" component={CategoryPage} />
        <Route path="/:category/:id" component={PostDetailPage} />
      </div>
    );
  }
}

export default App;
