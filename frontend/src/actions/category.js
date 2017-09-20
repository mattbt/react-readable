import { config } from '../utils/config'
export const SET_CATEGORIES = 'SET_CATEGORIES'
export const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY'

function setCategories({ list }) {
  return {
    type: SET_CATEGORIES,
    list
  }
}
export function setCurrentCategory({ currentCategory }) {
  return {
    type: SET_CURRENT_CATEGORY,
    currentCategory
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
