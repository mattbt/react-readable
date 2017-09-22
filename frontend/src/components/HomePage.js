import React, { Component } from 'react'
import { connect } from 'react-redux'

import CategoryList from './CategoryList'
import PostList from './PostList'
import { setCurrentCategory } from '../actions/category'
import { fetchPosts } from '../actions/post'

class HomePage extends Component {

  componentDidMount(){
    // from post & category reducer
    const { fetchPosts, setCurrentCategory, categories } = this.props
    setCurrentCategory({'currentCategory': null})
    fetchPosts(null)
  }

  render() {
    return (<PostList />)
  }
}

function mapStateToProps ({category}) {
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
