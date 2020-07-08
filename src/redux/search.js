import { updateSearch } from './actions'

export const startSearchAction = () => (dispatch) => {
  dispatch(updateSearch('', true, []))
}

export const updateSearchAction = (searchString) => (dispatch) => {
  dispatch(updateSearch(searchString, true, []))
}

export const endSearchAction = () => (dispatch) => {
  dispatch(updateSearch('', false, []))
}
