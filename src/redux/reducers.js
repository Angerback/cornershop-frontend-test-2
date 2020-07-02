import {
  FETCH_COUNTERS_SUCCESS,
  FETCH_COUNTERS_ERROR,
  FETCH_COUNTERS_PENDING,
  CREATE_COUNTERS_SUCCESS,
  CREATE_COUNTERS_PENDING,
  CREATE_COUNTERS_ERROR,
} from './actionTypes'
import initialState from './initialState'

const counters = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_COUNTERS_PENDING:
    return {
      ...state,
      pending: true,
    }
  case FETCH_COUNTERS_SUCCESS:
    return {
      ...state,
      pending: false,
      counters: action.counters,
    }
  case FETCH_COUNTERS_ERROR:
    return {
      ...state,
      pending: false,
      error: action.error,
    }
  case CREATE_COUNTERS_PENDING:
    return {
      ...state,
      createPending: true,
    }
  case CREATE_COUNTERS_SUCCESS:
    return {
      ...state,
      counters: [...state.counters, action.createdCounter],
    }
  case CREATE_COUNTERS_ERROR:
    return {
      ...state,
      createError: action.error,
    }
  default:
    return state
  }
}

export const getCounters = (state) => state.counters
export const getCountersPending = (state) => state.pending
export const getCountersError = (state) => state.error

export const getCountersCreationPending = (state) => state.createPending
export const getCountersCreationError = (state) => state.createError

export default counters
