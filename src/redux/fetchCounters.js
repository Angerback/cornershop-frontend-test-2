import axios from 'axios'
import { fetchCountersPending, fetchCountersError, fetchCountersSuccess } from './actions'

const fetchCounters = () => (dispatch) => {
  dispatch(fetchCountersPending())
  axios.get('http://localhost:3001/api/v1/counter')
    .then((res) => {
      if (res.error) {
        throw (res.error)
      }
      dispatch(fetchCountersSuccess(res.data))
    })
    .catch((error) => {
      dispatch(fetchCountersError(error))
    })
}

export default fetchCounters
