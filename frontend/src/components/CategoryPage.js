import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostList from './PostList'
import Page404 from './Page404'
import { fetchPosts } from '../actions/post'
import { setCurrentCategory } from '../actions/category'

class CategoryPage extends Component {
  componentDidMount(){
    this.reset()
  }
  componentDidUpdate(){
    this.reset()
  }
  reset = function(){
    // from url
    const { path } = this.props.match.params
    // from post & category reducer
    const { fetchPosts, setCurrentCategory, categories } = this.props

    setCurrentCategory({'currentCategory': path, categories})
    fetchPosts(path)
  }

  render() {
    // from category reducer
    const { currentCategory } = this.props

    return (
      <div>
        {currentCategory
          ? <div>
              <h3 className="category-title">Category: {currentCategory}</h3>
              <PostList category={currentCategory}/>
            </div>
          : <Page404 />
        }
      </div>

    )
  }
}

function mapStateToProps ({category, post}) {
  return {
    currentCategory: category.current,
    categories: category.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
