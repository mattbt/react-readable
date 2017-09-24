import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostList from './PostList'
import Page404 from './Page404'
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
    const { setCurrentCategory, categories } = this.props

    setCurrentCategory({'currentCategory': path, categories})
  }

  render() {
    // from category reducer
    const { currentCategory } = this.props

    return (
      <div>
        {currentCategory
          ? <div>
              <h3 className="category-title">Category: {currentCategory}</h3>
              <PostList />
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
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage)
