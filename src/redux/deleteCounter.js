import axios from 'axios'
import { deleteCountersError, deleteCountersPending, deleteCountersSuccess } from './actions'

const deleteCounter = (counterId) => (dispatch) => {
  dispatch(deleteCountersPending(counterId))
  axios.delete('http://localhost:3001/api/v1/counter', { data: { id: counterId } })
    .then((res) => {
      if (res.error) {
        throw (res.error)
      }
      dispatch(deleteCountersSuccess(res.data))
    })
    .catch((error) => {
      dispatch(deleteCountersError(error, counterId))
    })
}

export default deleteCounter
