import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import rootReducer from './redux/reducers'
import initialState from './redux/initialState'

const store = createStore(rootReducer, initialState, applyMiddleware(thunk))

const setHeight = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}
setHeight()

window.addEventListener('resize', setHeight)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
