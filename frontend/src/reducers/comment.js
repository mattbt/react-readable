import {
  RESET_COMMENT_LIST,
  APPEND_COMMENTS,
  SET_CURRENT_COMMENTS,
  UPDATE_COMMENT_IN_LIST,
  OPEN_COMMENT_MODAL,
  CLOSE_COMMENT_MODAL,
  UPDATE_MODAL_COMMENT
} from '../actions/comment'

// Comment reducer
const initialCommentState = {
  commentlist: {},
  currentComments: {},
  commentsModalState: {
    open: false,
    option: null,
    comment: null
  }
}
export default function comment (state = initialCommentState, action) {
  switch(action.type){
    case RESET_COMMENT_LIST:
      return {
        ...state,
        commentlist: {}
      }
    case APPEND_COMMENTS:
      const { comments } = action
      return {
        ...state,
        commentlist: Object.assign(state.commentlist,
          comments.reduce(function(result, current){
            result[current.id] = current
            return result
          }, {}))
      }
    case SET_CURRENT_COMMENTS:
      const { currentComments } = action
      return {
        ...state,
        currentComments: currentComments.reduce(function(result, current){
          result[current.id] = current
          return result
        }, {})
      }
    case UPDATE_COMMENT_IN_LIST:
      const { updatedComment } = action
      return {
        ...state,
        currentComments: {
          ...state.currentComments,
          [updatedComment.id]: updatedComment
        }
      }
    case OPEN_COMMENT_MODAL:
      const { option, comment } = action
      return {
        ...state,
        commentsModalState: {open: true, option, comment}
      }
    case CLOSE_COMMENT_MODAL:
      return {
        ...state,
        commentsModalState: {open: false, option: null, comment: null}
      }
    case UPDATE_MODAL_COMMENT:
      const { name, value } = action
      return {
        ...state,
        commentsModalState: {
          ...state.commentsModalState,
          comment: {
            ...state.commentsModalState.comment,
            [name]: value
          }}
      }
    default:
      return state;
  }
}
