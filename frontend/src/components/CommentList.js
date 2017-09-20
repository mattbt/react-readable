import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap';
import AddIcon from 'react-icons/lib/md/add'

import CommentListItem from './CommentListItem'
import CommentModal from './CommentModal'
import { openCommentModal } from '../actions/comment'
import { sortByScore } from '../utils/sort'

class CommentList extends Component {

  render() {
    // from parent
    const { parentId } = this.props
    // from post reducer
    const { currentComments, openCommentModal } = this.props

    return (
      <div className="post-list">
        <h4>Comments</h4>
        <div className="text-right clickable-icon"
          onClick={() => openCommentModal({ option: 'add', comment: { parentId } })}>
          <AddIcon size={20}/> comment</div>

        {currentComments.length === 0
          ? <p>no comments found</p>
          : <Table striped condensed hover>
              <tbody>
                {currentComments.map((comment) => (
                  <CommentListItem comment={comment} key={comment.id}/>
                ))}
              </tbody>
            </Table>
        }
        <CommentModal />
      </div>
    )
  }
}

function mapStateToProps ({comment}) {
  return {
    currentComments: Object.keys(comment.currentComments)
      .map((k) => comment.currentComments[k])
      .sort(sortByScore).reverse()
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openCommentModal: (...data) => dispatch(openCommentModal(...data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
