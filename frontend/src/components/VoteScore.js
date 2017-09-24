import React, { Component } from 'react'
import AngleUp from 'react-icons/lib/fa/angle-up'
import AngleDown from 'react-icons/lib/fa/angle-down'
import { connect } from 'react-redux'

import { updateCommentVote } from '../actions/comment'
import { updatePostVote } from '../actions/post'

class VoteScore extends Component {

  render() {
    // from parent
    const { vote, id, type, size } = this.props

    // from post & comment reducer
    const { updatePostVote, updateCommentVote } = this.props

    return (
      <div>
        <AngleUp className="clickable-icon" size={size}
          onClick={() => type === "post"
            ? updatePostVote(id, "upVote")
            : updateCommentVote(id, "upVote")}/>
        <br />{vote}<br />
        <AngleDown className="clickable-icon" size={size}
          onClick={() => type === "post"
            ? updatePostVote(id, "downVote")
            : updateCommentVote(id, "downVote")}/>
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
    updatePostVote: (...data) => dispatch(updatePostVote(...data)),
    updateCommentVote: (...data) => dispatch(updateCommentVote(...data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteScore)
