import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import { closePostModal, updateModalPost, addPost, deletePost, editPost } from '../actions/post'
import { fetchCategories } from '../actions/category'

class PostForm extends Component {
  componentDidMount(){
    const { categories, fetchCategories } = this.props

    // if page is loaded directly, categories are not set in store
    {categories.length === 0 && fetchCategories() }
  }
  render() {
    // from post reducer
    const { postModalState, closePostModal, updateModalPost } = this.props
    const { addPost, deletePost, editPost } = this.props
    const { option, post } = postModalState

    // from category reducer
    const { categories, currentCategory } = this.props

    return (
      <div>
        <form className="form">
          {"add" === option &&
            <div>
              <label className="form-label">Author</label>
              <input className="form-control" type="text" name="author" value={post.author}
                onChange={(e) => updateModalPost({
                  'name': e.target.name,
                  'value': e.target.value})} />
            </div>
          }
          <label className="form-label">Category</label>
          <select className="form-control" name="category" value={post.category}
            onChange={(e) => updateModalPost({
              'name': e.target.name,
              'value': e.target.value})}
            disabled={'delete' === option}>
              <option key="-" value="">-</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <label className="form-label">Title</label>
          <input className="form-control" type="text" name="title" value={post.title}
            onChange={(e) => updateModalPost({
              'name': e.target.name,
              'value': e.target.value})}
              disabled={'delete' === option}/>
          <label>Text</label>
          <textarea className="form-control" rows="5" name="body"
            value={post.body}
            onChange={(e) => updateModalPost({
              'name': e.target.name,
              'value': e.target.value})}
            disabled={'delete' === option}/>
          <br /><br />
          <Button bsStyle='default' onClick={closePostModal} data-dismiss="modal">Cancel</Button>&nbsp;
          <Button
            bsStyle={option === 'add' ? 'success' : (option === "edit" ? 'warning' : 'danger')}
            onClick={() => (option === 'add'
                  ? addPost(post, {currentCategory})
                  : (option === "edit"
                    ? editPost(post, {currentCategory})
                    : deletePost(post, {currentCategory}))
                  )}>
            {option === 'add' ? 'Add ' : (option === "edit" ? 'Edit ' : 'Delete ')}post
          </Button>
        </form>
      </div>
    );
  }
}

function mapStateToProps ({post, category}) {
  return {
    postModalState: post.postModalState,
    categories: category.list,
    currentCategory: category.current
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closePostModal: () => dispatch(closePostModal()),
    updateModalPost: (...data) => dispatch(updateModalPost(...data)),
    addPost: (...data) => dispatch(addPost(...data)),
    deletePost: (...data) => dispatch(deletePost(...data)),
    editPost: (...data) => dispatch(editPost(...data)),
    fetchCategories: (data) => dispatch(fetchCategories(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
