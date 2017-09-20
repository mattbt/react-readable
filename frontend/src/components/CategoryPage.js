import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import PostList from './PostList'
import { fetchPosts } from '../actions/post'
import { setCurrentCategory } from '../actions/category'

class CategoryPage extends Component {
  componentDidMount(){
    // from url
    const { path } = this.props.match.params
    // from post & category reducer
    const { fetchPosts, setCurrentCategory } = this.props

    setCurrentCategory({'currentCategory': path})
    fetchPosts(path)
  }

  render() {
    // from category reducer
    const { currentCategory } = this.props

    return (
      <div className="wrapper">
        <div className="block-right">
          <h3 className="category-title">Category: {currentCategory}</h3><br />
          <div className="category-nav">
            <Link to="/">back to home page</Link>
          </div><br />
          <PostList category={currentCategory}/>
        </div>
      </div>


    )
  }
}

function mapStateToProps ({category, post}) {
  return {
    currentCategory: category.current
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
