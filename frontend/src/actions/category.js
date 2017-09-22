import { config } from '../utils/config'
import { SET_CATEGORIES, SET_CURRENT_CATEGORY } from './types'

function setCategories({ list }) {
  return {
    type: SET_CATEGORIES,
    list
  }
}
function setCategory({ currentCategory }){
  return {
    type: SET_CURRENT_CATEGORY,
    currentCategory
  }
}
export function setCurrentCategory({ currentCategory }) {
  return function (dispatch) {
    // no checks if resetting
    if(currentCategory === null){
      return dispatch(setCategory({ currentCategory }))
    }

    // check if requested category exists
    const { server, headers } = config
    const requestPath = `${server}/categories`
    return fetch(requestPath, { headers, method: 'GET'})
        .then(
            response => response.json(),
            error => console.log('An error occured.', error))
        .then(data => {
          if(data.categories.filter((c) => (c.path === currentCategory)).length == 0){
            dispatch(setCategory({currentCategory: null}))
          } else {
            dispatch(setCategory({currentCategory}))
          }
        })
    }
  }

export function fetchCategories() {
  return function (dispatch) {
    const { server, headers } = config
    const requestPath = `${server}/categories`
    return fetch(requestPath, { headers, method: 'GET'})
        .then(
            response => response.json(),
            error => console.log('An error occured.', error))
        .then(data => {
          dispatch(setCategories({list: data.categories}))
        })
    }
}
