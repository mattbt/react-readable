import React, { Component } from 'react'
import { connect } from 'react-redux'

import VoteScore from './VoteScore'
import { openCommentModal } from '../actions/comment'
import EditIcon from 'react-icons/lib/md/edit'
import DeleteIcon from 'react-icons/lib/md/delete'
import { timestampToDate } from '../utils/format'

class CommentListItem extends Component {

  render() {
    // from parent
    const {comment} = this.props
    // from post reducer
    const { openCommentModal } = this.props

    return (
      <tr>
        <td className="vote-score"><VoteScore type="comment" id={comment.id} vote={comment.voteScore} size={23}/></td>
        <td><br />{comment.author}</td>
        <td><br />{comment.body}</td>
        <td><br />{timestampToDate(comment.timestamp)}</td>
        <td><br />
          <DeleteIcon className="clickable-icon lightgray" size={21} onClick={() => openCommentModal({ option: 'delete', comment })}/>
          <EditIcon className="clickable-icon lightgray" size={21} onClick={() => openCommentModal({ option: 'edit', comment })}/>
        </td>
      </tr>
    )
  }
}

function mapStateToProps ({}) {
  return {
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openCommentModal: (...data) => dispatch(openCommentModal(...data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListItem)
