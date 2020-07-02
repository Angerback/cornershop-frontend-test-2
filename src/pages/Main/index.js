import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fetchCountersAction from '../../redux/fetchCounters'
import { getCounters, getCountersError, getCountersPending } from '../../redux/reducers'

import Toolbar from '../../components/Toolbar'
import Centered from '../../components/CenteredWrapper'

import ActivityIndicator from '../../icons/activityIndicator.svg'
import SearchBar from '../../components/SearchBar'
import Counter from '../../components/Counter'

class Main extends PureComponent {
    static propTypes = {
      pending: PropTypes.bool.isRequired,
      error: PropTypes.object,
      counters: PropTypes.array.isRequired,
      fetchCounters: PropTypes.func.isRequired,
    }

    static defaultProps = {
      error: null,
    }

    componentDidMount() {
      const { fetchCounters } = this.props
      fetchCounters()
    }

    render() {
      const { pending, counters } = this.props
      return (
        <section style={{
          padding: '16px',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <SearchBar></SearchBar>
          {pending && (
            <Centered>
              <ActivityIndicator />
            </Centered>
          )}
          {!pending && counters.length > 0 && (
            <div style={{ flex: '1' }}>
              {counters.map((counter) => <Counter key={counter.id} counter={counter}></Counter>)}
            </div>
          )}
          {!pending && counters.length === 0 && (
            <Centered>
              <h1>No counters yet</h1>
              <p>“When I started counting my blessings,
                 my whole life turned around.” —Willie Nelson
              </p>
            </Centered>
          )}
          <Toolbar />
        </section>
      )
    }
}

const mapStateToProps = (state) => ({
  error: getCountersError(state),
  counters: getCounters(state),
  pending: getCountersPending(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCounters: fetchCountersAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
