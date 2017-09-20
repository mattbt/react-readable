import {
  SET_POSTS,
  SET_CURRENT_POST,
  SET_SORT_BY,
  UPDATE_POST_IN_LIST,
  OPEN_POST_MODAL,
  CLOSE_POST_MODAL,
  UPDATE_MODAL_POST
} from '../actions/post'


// Post reducer
const initialPostState = {
  list: {},
  sortBy: 'score',
  current: null,
  postModalState: {
    open: false,
    option: null,
    post: null
  }
}

export default function post(state = initialPostState, action) {
  switch(action.type){
    case SET_POSTS:
      const { postlist } = action
      return {
        ...state,
        list: postlist.reduce(function(result, current){
          result[current.id] = current
          return result
        }, {}),
        commentlist: {}
      }
    case SET_SORT_BY:
      const { sortBy } = action
      return {
        ...state,
        sortBy
      }
    case SET_CURRENT_POST:
      const { post } = action
      return {
        ...state,
        current: post
      }
    case UPDATE_POST_IN_LIST:
      const { updatedPost } = action
      if (`${updatedPost.id}` in state.list){
        console.log('post in current list')
        return {
          ...state,
          list: {
            ...state.list,
            [updatedPost.id]: updatedPost
          }
        }
      }
      return state
    case OPEN_POST_MODAL:
      const { option } = action
      return {
        ...state,
        postModalState: {open: true, option, post: action.post}
      }
    case CLOSE_POST_MODAL:
      return {
        ...state,
        postModalState: {open: false, option: null, post: null}
      }
    case UPDATE_MODAL_POST:
      const { name, value } = action
      return {
        ...state,
        postModalState: {
          ...state.postModalState,
          post: {
            ...state.postModalState.post,
            [name]: value
          }}
      }
    default:
      return state;
  }
}
