import { FETCH_COUNTERS_SUCCESS, FETCH_COUNTERS_ERROR, FETCH_COUNTERS_PENDING } from './actionTypes'
import initialState from './initialState'

const counters = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_COUNTERS_PENDING:
    return {
      ...state,
      pending: true
    }
  case FETCH_COUNTERS_SUCCESS:
    return {
      ...state,
      pending: false,
      counters: action.counters
    }
  case FETCH_COUNTERS_ERROR:
    return {
      ...state,
      pending: false,
      error: action.error
    }
  default:
    return state
  }
}

export const getCounters = state => state.counters
export const getCountersPending = state => state.pending
export const getCountersError = state => state.error

export default counters