import React, { Component } from 'react'
import { connect } from 'react-redux'

import PostList from './PostList'
import { setCurrentCategory } from '../actions/category'
import { fetchPosts } from '../actions/post'

class HomePage extends Component {

  componentDidMount(){
    // from post & category reducer
    const { fetchPosts, setCurrentCategory } = this.props
    setCurrentCategory({'currentCategory': null})
    fetchPosts()
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
    fetchPosts: () => dispatch(fetchPosts()),
    setCurrentCategory: (data) => dispatch(setCurrentCategory(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
