import {
  FETCH_COUNTERS_PENDING,
  FETCH_COUNTERS_ERROR,
  FETCH_COUNTERS_SUCCESS,
  CREATE_COUNTERS_ERROR,
  CREATE_COUNTERS_ERROR_CLEAR,
  CREATE_COUNTERS_PENDING,
  CREATE_COUNTERS_SUCCESS,
  TOGGLE_COUNTERS_ERROR,
  TOGGLE_COUNTERS_PENDING,
  TOGGLE_COUNTERS_SUCCESS,
  DELETE_COUNTERS_ERROR,
  DELETE_COUNTERS_PENDING,
  DELETE_COUNTERS_SUCCESS,
  SELECT_COUNTER,
  DESELECT_COUNTER,
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

export const createCountersErrorClear = () => ({
  type: CREATE_COUNTERS_ERROR_CLEAR,
})

export const createCountersSuccess = (createdCounter) => ({
  type: CREATE_COUNTERS_SUCCESS,
  createdCounter,
})

export const toggleCountersPending = (id) => ({
  type: TOGGLE_COUNTERS_PENDING,
  toggleId: id,
})

export const toggleCountersError = (error, id) => ({
  type: TOGGLE_COUNTERS_ERROR,
  error,
  toggleId: id,
})

export const toggleCountersSuccess = (toggledCounter, id) => ({
  type: TOGGLE_COUNTERS_SUCCESS,
  toggledCounter,
  toggleId: id,
})

export const deleteCountersPending = (id) => ({
  type: DELETE_COUNTERS_PENDING,
  id,
})

export const deleteCountersError = (error, id) => ({
  type: DELETE_COUNTERS_ERROR,
  error,
  id,
})

export const deleteCountersSuccess = (id) => ({
  type: DELETE_COUNTERS_SUCCESS,
  id,
})

export const selectCounter = (id) => ({
  type: SELECT_COUNTER,
  selectedCounterId: id,
})

export const deselectCounter = () => ({
  type: DESELECT_COUNTER,
})
