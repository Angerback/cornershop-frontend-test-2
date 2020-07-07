import axios from 'axios'
import { toggleCountersError, toggleCountersPending, toggleCountersSuccess } from './actions'

const toggleCounter = ({ id, isIncrease }) => (dispatch) => {
  dispatch(toggleCountersPending(id))
  const url = isIncrease ? 'http://localhost:3001/api/v1/counter/inc' : 'http://localhost:3001/api/v1/counter/dec'
  axios.post(url, { id })
    .then((res) => {
      if (res.error) {
        throw (res.error)
      }
      dispatch(toggleCountersSuccess(res.data, id))
    })
    .catch((error) => {
      const toggleError = error
      toggleError.isIncrease = isIncrease
      dispatch(toggleCountersError(toggleError, id))
    })
}

export default toggleCounter
