import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap';
import AddIcon from 'react-icons/lib/md/add'

import PostListItem from './PostListItem'
import PostModal from './PostModal'
import { openPostModal, setSortBy } from '../actions/post'
import { sortByScore, sortByTimestamp } from '../utils/sort'

class PostList extends Component {

  render() {
    // from parent
    const { category } = this.props
    // from post reducer
    const { postlist, openPostModal, setSortBy, sortBy } = this.props

    return (
      <div className="category-post-list">
        <h3>Post List</h3>
        <div>
          order by &nbsp;
          <select className="text-left" value={sortBy}
            onChange={(e) => setSortBy({sortBy: e.target.value})}>
            <option value="score">score</option>
            <option value="timestamp">timestamp</option>
          </select>
          <div className="text-right clickable-icon"
            onClick={() => openPostModal({ option: 'add', post: { category } })}>
            <AddIcon size={20}/> post
          </div>
        </div>

        {postlist.length === 0
          ? <div>no data to display</div>
          : <Table striped condensed hover>
              <tbody>
                {postlist.map((post) => (
                  <PostListItem post={post} key={post.id}/>
                ))}
              </tbody>
            </Table>
        }
        <PostModal categoryPath={category}/>
      </div>
    )
  }
}

function mapStateToProps ({category, post}) {
  return {
    postlist: Object.keys(post.list).map((k) => post.list[k]).sort(
      post.sortBy === "score"
      ? sortByScore
      : sortByTimestamp
    ).reverse(),
    sortBy: post.sortBy
  }
}

function mapDispatchToProps (dispatch) {
  return {
    openPostModal: (data) => dispatch(openPostModal(data)),
    setSortBy: (data) => dispatch(setSortBy(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
