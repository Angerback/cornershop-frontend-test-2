import { createCountersErrorClear, deleteCountersErrorClear } from './actions'

export const createCountersErrorClearAction = () => (dispatch) => {
  dispatch(createCountersErrorClear())
}

export const deleteCountersErrorClearAction = () => (dispatch) => {
  dispatch(deleteCountersErrorClear())
}

export default { createCountersErrorClearAction }
