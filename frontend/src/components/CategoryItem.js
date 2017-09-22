import React, { Component } from 'react'
import { NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux'

class CategoryItem extends Component {
  render() {
    // from parent
    const {cat} = this.props
    // from category reducer
    const {currentCategory} = this.props
    
    return (
      <LinkContainer to={`/${cat.path}`} className="category-item">
        <NavItem className={currentCategory === cat.path ? "reactive" : ""}>{cat.name}</NavItem>
      </ LinkContainer>
    )
  }
}

function mapStateToProps ({category}) {
  return {
    currentCategory: category.current
  }
}

function mapDispatchToProps (dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem)
