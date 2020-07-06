import { createCountersErrorClear } from './actions'

export const createCountersErrorClearAction = () => (dispatch) => {
  dispatch(createCountersErrorClear())
}

export default { createCountersErrorClearAction }
