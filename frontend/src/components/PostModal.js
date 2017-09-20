import React, { Component } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'

import PostForm from './PostForm'
import { closePostModal } from '../actions/post'

class PostModal extends Component {

  render() {
    // from post reducer
    const { postModalState, closePostModal } = this.props

    return (
      <Modal
         className='modalcustom'
         overlayClassName='overlay'
         isOpen={postModalState.open}
         onRequestClose={closePostModal}
         contentLabel='Modal'
       >
         {postModalState.open &&
           <div>
            <div className="modal-header">
              <button type="button" className="close" onClick={closePostModal} data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{postModalState.option} post</h4>
            </div>
            <div className="modal-body">
              <PostForm />
            </div>
           </div>
         }
      </Modal>
    )
  }
}

function mapStateToProps ({post}) {
  return {
    postModalState: post.postModalState
  }
}

function mapDispatchToProps (dispatch) {
  return {
    closePostModal: () => dispatch(closePostModal())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
