import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'

import { closeCommentModal, updateModalComment, addComment, deleteComment, editComment } from '../actions/comment'

class CommentForm extends Component {

  render() {
    // from comment reducer
    const { commentsModalState, closeCommentModal, updateModalComment } = this.props
    const { addComment, deleteComment, editComment } = this.props
    const { option, comment } = commentsModalState

    return (
      <div>
        <form className="form">
          {"add" === option &&
            <div>
              <label className="form-label">Author</label>
              <input className="form-control" type="text" name="author" value={comment.author}
                onChange={(e) => updateModalComment({
                  'name': e.target.name,
                  'value': e.target.value})} />
            </div>
          }
          <label>Text</label>
          <textarea className="form-control" rows="5" name="body"
            value={comment.body}
            onChange={(e) => updateModalComment({
              'name': e.target.name,
              'value': e.target.value})}
            disabled={'delete' === option}/>
          <br /><br />
          <Button bsStyle='default' onClick={closeCommentModal} data-dismiss="modal">Cancel</Button>&nbsp;
          <Button
            bsStyle={option === 'add' ? 'success' : (option === "edit" ? 'warning' : 'danger')}
            onClick={() => (option === 'add'
                  ? addComment(comment)
                  : (option === "edit"
                    ? editComment(comment)
                    : deleteComment(comment))
                  )}>
            {option === 'add' ? 'Add ' : (option === "edit" ? 'Edit ' : 'Delete ')}comment
          </Button>
        </form>

      </div>
    );
  }
}

function mapStateToProps ({comment}) {
  return {
    commentsModalState: comment.commentsModalState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeCommentModal: () => dispatch(closeCommentModal()),
    updateModalComment: (...data) => dispatch(updateModalComment(...data)),
    addComment: (data) => dispatch(addComment(data)),
    deleteComment: (data) => dispatch(deleteComment(data)),
    editComment: (data) => dispatch(editComment(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)
