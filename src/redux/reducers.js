import {
  FETCH_COUNTERS_SUCCESS,
  FETCH_COUNTERS_ERROR,
  FETCH_COUNTERS_PENDING,
  CREATE_COUNTERS_SUCCESS,
  CREATE_COUNTERS_PENDING,
  CREATE_COUNTERS_ERROR,
  CREATE_COUNTERS_ERROR_CLEAR,
  TOGGLE_COUNTERS_SUCCESS,
  TOGGLE_COUNTERS_ERROR,
  TOGGLE_COUNTERS_PENDING,
  DELETE_COUNTERS_SUCCESS,
  DELETE_COUNTERS_PENDING,
  DELETE_COUNTERS_ERROR,
  SELECT_COUNTER,
  DESELECT_COUNTER,
} from './actionTypes'
import initialState from './initialState'

const counters = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_COUNTERS_PENDING:
    return {
      ...state,
      pending: true,
      error: null,
    }
  case FETCH_COUNTERS_SUCCESS:
    return {
      ...state,
      pending: false,
      error: null,
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
      createError: null,
    }
  case CREATE_COUNTERS_SUCCESS:
    return {
      ...state,
      createPending: false,
      createError: null,
      counters: [...state.counters, action.createdCounter],
    }
  case CREATE_COUNTERS_ERROR:
    return {
      ...state,
      createPending: false,
      createError: action.error,
    }
  case CREATE_COUNTERS_ERROR_CLEAR:
    return {
      ...state,
      createPending: false,
      createError: null,
    }
  case TOGGLE_COUNTERS_PENDING:
    return {
      ...state,
      togglePending: true,
      toggleError: null,
      toggleId: action.toggleId,
    }
  case TOGGLE_COUNTERS_ERROR:
    return {
      ...state,
      togglePending: false,
      toggleError: action.error,
      toggleId: action.toggleId,
    }
  case TOGGLE_COUNTERS_SUCCESS:
    return {
      ...state,
      togglePending: false,
      toggleError: null,
      toggleId: '',
      counters: state.counters.map((counter) => {
        if (counter.id === action.toggledCounter.id) {
          return action.toggledCounter
        }
        return counter
      }),
    }
  case DELETE_COUNTERS_PENDING:
    return {
      ...state,
      deletePending: true,
      deleteId: action.id,
    }
  case DELETE_COUNTERS_ERROR:
    return {
      ...state,
      deletePending: false,
      deleteId: action.id,
      deleteError: action.error,
    }
  case DELETE_COUNTERS_SUCCESS:
    return {
      ...state,
      deletePending: false,
      deleteId: action.id,
      counters: state.counters.filter((counter) => action.id !== counter.id),
      selectedCounterId: '',
    }
  case SELECT_COUNTER:
    return {
      ...state,
      selectedCounterId: action.selectedCounterId,
    }
  case DESELECT_COUNTER:
    return {
      ...state,
      selectedCounterId: '',
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

export const getCountersTogglePending = (state) => state.togglePending
export const getCountersToggleError = (state) => state.toggleError
export const getCountersToggleId = (state) => state.toggleId

export const getCountersDeletePending = (state) => state.deletePending
export const getCountersDeleteError = (state) => state.deleteError
export const getCountersDeleteId = (state) => state.deleteId

export const getSelectedCounter = (state) => state.selectedCounterId

export default counters
