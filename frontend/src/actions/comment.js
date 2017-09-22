import { config } from '../utils/config'
import uuidv1 from 'uuid/v1'

import {
  RESET_COMMENT_LIST,
  APPEND_COMMENTS,
  SET_CURRENT_COMMENTS,
  UPDATE_COMMENT_IN_LIST,
  OPEN_COMMENT_MODAL,
  CLOSE_COMMENT_MODAL,
  UPDATE_MODAL_COMMENT
} from './types'



function appendComments(comments) {
  return {
    type: APPEND_COMMENTS,
    comments
  }
}
function setCurrentComments(currentComments) {
  return {
    type: SET_CURRENT_COMMENTS,
    currentComments
  }
}
function updateCommentInList({ updatedComment }) {
  return {
    type: UPDATE_COMMENT_IN_LIST,
    updatedComment
  }
}

export function updateCommentVote(id, option, current) {
  return function (dispatch) {
    const { server, headers } = config
    const requestPath = `${server}/comments/${id}`
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
          dispatch(updateCommentInList({'updatedComment': data}))
        })
  }
}
export function addComment(comment){
  return function(dispatch){
    const { author, parentId } = comment

    const { server, headers } = config
    const requestPath = `${server}/comments`
    return fetch(requestPath, {
          headers:{...headers, "Content-Type": "application/json"},
          method: 'POST',
          body: JSON.stringify({
            parentId,
            author,
            body: comment.body,
            'id': uuidv1(),
            'timestamp': Date.now()
          })
        })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          dispatch(fetchComments(parentId, true))
          dispatch(closeCommentModal())
        })
  }
}

export function editComment(comment){
  return function(dispatch){
    const { id, parentId } = comment

    const { server, headers } = config
    const requestPath = `${server}/comments/${id}`
    return fetch(requestPath, {
          headers:{...headers, "Content-Type": "application/json"},
          method: 'PUT',
          body: JSON.stringify({
            body: comment.body,
            'timestamp': Date.now()
          })
        })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          dispatch(fetchComments(parentId, true))
          dispatch(closeCommentModal())
        })
  }
}
export function deleteComment(comment){
  return function(dispatch){
    const { id, parentId } = comment

    const { server, headers } = config
    const requestPath = `${server}/comments/${id}`
    return fetch(requestPath, {
          headers:{...headers, "Content-Type": "application/json"},
          method: 'DELETE'
        })
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          dispatch(fetchComments(parentId, true))
          dispatch(closeCommentModal())
        })
  }
}



export function fetchComments(id, current = false) {
  return function (dispatch) {
    const { server, headers } = config
    const requestPath = `${server}/posts/${id}/comments`

    return fetch(requestPath, { headers, method: 'GET'})
        .then(
          response => response.json(),
          error => console.log('An error occured.', error)
        )
        .then(data => {
          current
          ? dispatch(setCurrentComments(data))
          : dispatch(appendComments(data))
        })
  }
}





export function updateModalComment({ name, value }){
  return {
    type: UPDATE_MODAL_COMMENT,
    name,
    value
  }
}
export function openCommentModal({ option, comment }){
  return {
    type: OPEN_COMMENT_MODAL,
    option,
    comment
  }
}
export function closeCommentModal(){
  return {
    type: CLOSE_COMMENT_MODAL
  }
}
export function resetCommentList(){
  return {
    type: RESET_COMMENT_LIST
  }
}
