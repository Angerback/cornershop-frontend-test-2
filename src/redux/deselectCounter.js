import { deselectCounter } from './actions'

const deselectCounterAction = (id) => (dispatch) => {
  dispatch(deselectCounter(id))
}

export default deselectCounterAction
