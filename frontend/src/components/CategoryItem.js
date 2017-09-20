import React, { Component } from 'react'
import { NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

class CategoryItem extends Component {
  render() {
    // from parent
    const {cat} = this.props

    return (
      <LinkContainer to={`/${cat.path}`}>
        <NavItem eventKey={cat.name} >{cat.name}</NavItem>
      </ LinkContainer>
    )
  }
}

export default CategoryItem
