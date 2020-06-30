import {fetchCountersPending, fetchCountersError, fetchCountersSuccess} from './actions'
import axios from 'axios'

const fetchCounters = () => {
  return dispatch => {
    dispatch(fetchCountersPending())
    axios.get('http://localhost:3001/api/v1/counter')
      .then((res) => {
        if (res.error) {
          throw(res.error)
        }
        dispatch(fetchCountersSuccess(res.data))
      })
      .catch(error => {
        dispatch(fetchCountersError(error))
      })
  }
}

export default fetchCounters