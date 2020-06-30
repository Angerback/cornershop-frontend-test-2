import { FETCH_COUNTERS_PENDING,
  FETCH_COUNTERS_ERROR,
  FETCH_COUNTERS_SUCCESS } from './actionTypes'


export const fetchCountersPending = () => {
  return {
    type: FETCH_COUNTERS_PENDING
  }
}

export const fetchCountersError = (error) => {
  return {
    type: FETCH_COUNTERS_ERROR,
    error: error
  }
}

export const fetchCountersSuccess = (counters) => {
  return {
    type: FETCH_COUNTERS_SUCCESS,
    counters: counters
  }
}