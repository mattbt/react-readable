import {
  SET_CATEGORIES,
  SET_CURRENT_CATEGORY
} from '../actions/types'

const initialCategoryState = {
   list: [],
   current: null
}

// Category reducer
export default function category (state = initialCategoryState, action) {
  switch(action.type){
    case SET_CATEGORIES:
      const { list } = action
      return {
        ...state,
        list: list
      }
    case SET_CURRENT_CATEGORY:
      const { currentCategory } = action
      return {
        ...state,
        current: currentCategory
      }
    default:
      return state
  }
}
