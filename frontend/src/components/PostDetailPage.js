import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import EditIcon from 'react-icons/lib/md/edit'
import DeleteIcon from 'react-icons/lib/md/delete'

import PostModal from './PostModal'
import CommentList from './CommentList'
import VoteScore from './VoteScore'
import { fetchPost, openPostModal } from '../actions/post'

class PostDetailPage extends Component {
  componentDidMount(){
    // from url
    const { id } = this.props.match.params
    // from post reducer
    const { fetchPost } = this.props

    fetchPost(id)
  }

  render() {
    // from post reducer
    const { currentPost, openPostModal } = this.props

    return (
      <div className="wrapper">
        {currentPost
          ? <div className="page-one-column">
              <div className="vote-score-large">
                <VoteScore type="post" id={currentPost.id} vote={currentPost.voteScore}
                className="post-detail-left" size={30} current={true}/>
                <EditIcon className="clickable-icon lightgray" size={21} onClick={() => openPostModal({ option: 'edit', post: currentPost })}/><br />
                <DeleteIcon className="clickable-icon lightgray" size={21} onClick={() => openPostModal({ option: 'delete', post: currentPost })}/>
                <PostModal categoryPath={currentPost.category}/>
              </div>
              <div className="post-detail-right">
                <h3> {currentPost.title}<br /><small>Category: {currentPost.category}</small></h3>
                <p>{currentPost.body}</p>
                <Link to="/">back to home page</Link>
                <hr />
                <CommentList parentId={currentPost.id} />
              </div>
            </div>
          : <div className="page-one-column">
              <div className="post-detail-right">
                <h3>Post not found</h3>
                <Link to="/">back to home page</Link>
              </div>
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps ({post}) {
  return {
    currentPost: post.current
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPost: (data) => dispatch(fetchPost(data)),
    openPostModal: (...data) => dispatch(openPostModal(...data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailPage)