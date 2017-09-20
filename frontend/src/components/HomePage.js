import React, { Component } from 'react'
import { connect } from 'react-redux'

import CategoryList from './CategoryList'
import PostList from './PostList'
import { setCurrentCategory } from '../actions/category'
import { fetchPosts } from '../actions/post'

class HomePage extends Component {

  componentDidMount(){
    // from post & category reducer
    const { fetchPosts, setCurrentCategory } = this.props

    setCurrentCategory({'currentCategory': null})
    fetchPosts(null)
  }

  render() {
    return (
        <div className="wrapper">
          <div className="block-left">
            <CategoryList />
          </div>
          <div className="block-right">
            <PostList />
          </div>
        </div>
    )
  }
}

function mapStateToProps ({}) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPosts: (data) => dispatch(fetchPosts(data)),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
