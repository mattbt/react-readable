import React, { Component } from 'react'
import { Nav } from 'react-bootstrap'
import { connect } from 'react-redux'

import CategoryItem from './CategoryItem'
import { fetchCategories } from '../actions/category'

class CategoryList extends Component {

  componentDidMount(){
    // from category reducer
    const { fetchCategories } = this.props

    fetchCategories()
  }

  render() {
    // from category reducer
    const { categories } = this.props

    return (
      <div className="category-list">
        <h3>Category List</h3>
        <Nav stacked bsStyle="pills" activeKey={'future'}>
          {categories.map((cat) => (
            <CategoryItem cat={cat} key={cat.name}/>
          ))}
        </Nav>
      </div>
    )
  }
}

function mapStateToProps ({category}) {
  return {
    categories: category.list
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchCategories: (data) => dispatch(fetchCategories(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
