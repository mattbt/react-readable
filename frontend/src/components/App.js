import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import HomeIcon from 'react-icons/lib/md/home'
import { Link } from 'react-router-dom'

import CategoryList from './CategoryList'
import HomePage from './HomePage'
import PostDetailPage from './PostDetailPage'
import CategoryPage from './CategoryPage'
import Page404 from './Page404'

class App extends Component {

  render() {
    return (
      <div className="app">
        <h1 className="app-header">Readables</h1>
        <hr />
        <div className="wrapper">
          <div className="block-left">
            <Link to="/" className="clickable-icon"><HomeIcon size={20}/> Home</Link>
            <CategoryList />
          </div>
          <div className="block-right">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/:path" component={CategoryPage} />
              <Route exact path="/:category/:id" component={PostDetailPage} />
              <Route exact path='*' component={Page404} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
