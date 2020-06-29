import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import loadable from '@loadable/component'

const WelcomePage = loadable(() => import('./pages/Welcome'))

export default class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route path="/welcome" component={props => <WelcomePage {...props}/>} />
            <Route path="/">
              <Redirect to="/welcome"></Redirect>
            </Route>
          </Switch>
        </Fragment>
      </Router>
    )
  }
}
