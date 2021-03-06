import { config } from '../utils/config'
import uuidv1 from 'uuid/v1'
import { resetCommentList, fetchComments } from './comment'

import {
  SET_POSTS,
  SET_CURRENT_POST,
  SET_SORT_BY,
  UPDATE_POST_IN_LIST,
  REMOVE_POST_FROM_LIST,
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
  UPDATE_MODAL_POST
} from './types'

function setCurrentPost({ post }) {
  return {
    type: SET_CURRENT_POST,
    post
  }
}
export function setSortBy({ sortBy }) {
  return {
    type: SET_SORT_BY,
    sortBy
  }
}
function updatePostInList({ updatedPost }) {
  return {
    type: UPDATE_POST_IN_LIST,
    updatedPost
  }
}
function removePostFromList({ updatedPost }) {
  return {
    type: REMOVE_POST_FROM_LIST,
    updatedPost
  }
}
function setPosts({ postlist }) {
  return {
    type: SET_POSTS,
    postlist
  }
}
export function updatePostVote(id, option) {
  return function (dispatch) {
    const { server, headers } = config
    const requestPath = `${server}/posts/${id}`
    return fetch(requestPath, {
          headers:{...headers, "Content-Type": "application/json"},
          method: 'POST',
          body: JSON.stringify({ option })
        })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          // update post in list
          dispatch(updatePostInList({'updatedPost': data}))
          // update currentPost
          dispatch(setCurrentPost({'post': data}))
        })
  }
}
export function fetchPosts() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function (dispatch) {
    const { server, headers } = config
    const requestPath = `${server}/posts`

    return fetch(requestPath, { headers, method: 'GET'})
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          dispatch(setPosts({postlist:data}))
          dispatch(resetCommentList())
          // fetching comments
          data.map((post) => {
            dispatch(fetchComments(post.id))
          })
        })
    }
}

export function fetchPost(id) {
  return function (dispatch) {
    const { server, headers } = config
    const requestPath = `${server}/posts/${id}`

    return fetch(requestPath, { headers, method: 'GET'})
      .then(
          response => response.json(),
          error => console.log('An error occured.', error))
      .then(data => {
        if ('error' in data || Object.keys(data).length === 0) {
          dispatch(setCurrentPost({'post': null}))
        } else {
          dispatch(setCurrentPost({'post': data}))
          dispatch(fetchComments(id, true))
        }

      })
    }
}

export function updateModalPost({ name, value }){
  return {
    type: UPDATE_MODAL_POST,
    name,
    value
  }
}
export function openPostModal({ option, post }){
  return {
    type: OPEN_POST_MODAL,
    option,
    post
  }
}
export function closePostModal(){
  return {
    type: CLOSE_POST_MODAL
  }
}

export function addPost(post){
  return function(dispatch){
    const { title, author, category } = post
    const { server, headers } = config
    const requestPath = `${server}/posts`
    return fetch(requestPath, {
          headers:{...headers, "Content-Type": "application/json"},
          method: 'POST',
          body: JSON.stringify({
            title,
            author,
            category,
            body: post.body,
            'id': uuidv1(),
            'timestamp': Date.now()
          })
        })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          // update post.list
          dispatch(updatePostInList({'updatedPost': data}))
          // close modal
          dispatch(closePostModal())
        })
  }
}

export function editPost(post){
  return function(dispatch){
    const { id, title, category } = post
    const { server, headers } = config
    const requestPath = `${server}/posts/${id}`
    return fetch(requestPath, {
          headers:{...headers, "Content-Type": "application/json"},
          method: 'PUT',
          body: JSON.stringify({
            title,
            category,
            body: post.body,
            'timestamp': Date.now()
          })
        })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          // update post.list
          dispatch(updatePostInList({'updatedPost': data}))
          // update current post
          dispatch(setCurrentPost({'post': data}))
          // close modal
          dispatch(closePostModal())
        })
  }
}
export function deletePost(post){
  return function(dispatch){
    const { id } = post

    const { server, headers } = config
    const requestPath = `${server}/posts/${id}`
    return fetch(requestPath, {
          headers:{...headers, "Content-Type": "application/json"},
          method: 'DELETE'
        })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          // update post.list
          dispatch(removePostFromList({'updatedPost': data}))
          // update current post
          dispatch(setCurrentPost({'post': null}))
          // close modal
          dispatch(closePostModal())
        })
  }
}
