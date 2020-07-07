import { createCountersErrorClear, deleteCountersErrorClear, toggleCountersErrorClear } from './actions'

export const createCountersErrorClearAction = () => (dispatch) => {
  dispatch(createCountersErrorClear())
}

export const deleteCountersErrorClearAction = () => (dispatch) => {
  dispatch(deleteCountersErrorClear())
}

export const toggleCountersErrorClearAction = () => (dispatch) => {
  dispatch(toggleCountersErrorClear())
}

export default { createCountersErrorClearAction }
