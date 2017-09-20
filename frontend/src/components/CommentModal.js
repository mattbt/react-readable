import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'

import CommentForm from './CommentForm'
import { closeCommentModal } from '../actions/comment'

class CommentModal extends Component {

  render() {
    // from post reducer
    const { commentsModalState, closeCommentModal } = this.props

    return (
      <Modal
         className='modalcustom'
         overlayClassName='overlay'
         isOpen={commentsModalState.open}
         onRequestClose={closeCommentModal}
         contentLabel='Modal'
       >
       {commentsModalState.open &&
         <div>
          <div className="modal-header">
            <button type="button" className="close" onClick={closeCommentModal} data-dismiss="modal">&times;</button>
            <h4 className="modal-title">{commentsModalState.option} comment</h4>
          </div>
          <div className="modal-body">
            <CommentForm />
          </div>
         </div>
       }
      </Modal>
    )
  }
}

function mapStateToProps ({comment}) {
  return {
    commentsModalState: comment.commentsModalState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closeCommentModal: () => dispatch(closeCommentModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal)
