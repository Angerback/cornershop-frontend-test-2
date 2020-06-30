import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import loadable from '@loadable/component'
import GlobalStyle from './globalStyles'

const WelcomePage = loadable(() => import('./pages/Welcome'))
const MainPage = loadable(() => import('./pages/Main'))

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <GlobalStyle />
          <Switch>
            <Route path="/welcome" component={props => <WelcomePage {...props}/>} />
            <Route path="/main" component={props => <MainPage {...props}/>} />
            <Route path="/">
              <Redirect to="/welcome"></Redirect>
            </Route>
          </Switch>
        </Fragment>
      </Router>
    )
  }
}
