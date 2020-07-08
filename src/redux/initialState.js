const initialState = {
  pending: false,
  counters: [],
  error: null,
  createPending: false,
  createError: null,
  togglePending: false,
  toggleError: null,
  toggleId: '',
  selectedCounterId: '',
  pendingToggle: false,
  deletePending: false,
  deleteError: null,
  deleteId: '',
  isSearching: false,
  searchString: '',
  searchResult: [],
}

export default initialState
