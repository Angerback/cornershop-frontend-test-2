import { selectCounter } from './actions'

const selectCounterAction = (id) => (dispatch) => {
  dispatch(selectCounter(id))
}

export default selectCounterAction
