import {
  FETCH_COUNTERS_PENDING,
  FETCH_COUNTERS_ERROR,
  FETCH_COUNTERS_SUCCESS,
  CREATE_COUNTERS_ERROR,
  CREATE_COUNTERS_PENDING,
  CREATE_COUNTERS_SUCCESS,
} from './actionTypes'

export const fetchCountersPending = () => ({
  type: FETCH_COUNTERS_PENDING,
})

export const fetchCountersError = (error) => ({
  type: FETCH_COUNTERS_ERROR,
  error,
})

export const fetchCountersSuccess = (counters) => ({
  type: FETCH_COUNTERS_SUCCESS,
  counters,
})

export const createCountersPending = () => ({
  type: CREATE_COUNTERS_PENDING,
})

export const createCountersError = (error) => ({
  type: CREATE_COUNTERS_ERROR,
  error,
})

export const createCountersSuccess = (counters) => ({
  type: CREATE_COUNTERS_SUCCESS,
  counters,
})
