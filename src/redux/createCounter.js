import axios from 'axios'
import { createCountersError, createCountersPending, createCountersSuccess } from './actions'

const fetchCounters = (counter) => (dispatch) => {
  dispatch(createCountersPending())
  axios.post('http://localhost:3001/api/v1/counter', counter)
    .then((res) => {
      if (res.error) {
        throw (res.error)
      }
      dispatch(createCountersSuccess(res.data))
    })
    .catch((error) => {
      dispatch(createCountersError(error))
    })
}

export default fetchCounters
