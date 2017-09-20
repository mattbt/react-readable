import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-o-right'
import EditIcon from 'react-icons/lib/md/edit'
import DeleteIcon from 'react-icons/lib/md/delete'

import VoteScore from './VoteScore'
import { timestampToDate } from '../utils/format'
import { openPostModal } from '../actions/post'

class PostListItem extends Component {

  render() {
    // from post reducer
    const { comments, openPostModal } = this.props
    // from parent
    const { post } = this.props

    return (
      <tr>
        <td className="vote-score"><VoteScore type="post" id={post.id} vote={post.voteScore} size={23}/></td>
        <td><br />{post.title}</td>
        <td><br />{post.author}</td>
        <td><br />{timestampToDate(post.timestamp)}</td>
        <td><br />{post.category}</td>
        <td><br />comments: {comments.filter((comment) => comment.parentId === post.id).length}</td>
        <td><br />
          <DeleteIcon className="clickable-icon lightgray" size={21} onClick={() => openPostModal({ option: 'delete', post })}/>
          <EditIcon className="clickable-icon lightgray" size={21} onClick={() => openPostModal({ option: 'edit', post })}/>
        </td>
        <td><br /><Link to={`/${post.category}/${post.id}`} className="clickable-icon"><ArrowRightIcon size={25}/></Link></td>
      </tr>
    )
  }
}

function mapStateToProps ({comment}) {
  return {
    comments: Object.keys(comment.commentlist).map((k) => comment.commentlist[k])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openPostModal: (...data) => dispatch(openPostModal(...data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostListItem)
