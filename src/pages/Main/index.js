import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fetchCountersAction from '../../redux/fetchCounters'
import {getCounters, getCountersError, getCountersPending} from '../../redux/reducers'

import {ReactComponent as ActivityIndicator } from '../../icons/activityIndicator.svg'
import SearchBar from '../../components/SearchBar'

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

    constructor(props) {
      super(props)

      this.state = {
            
      }
    }

    componentDidMount() {
      const {fetchCounters} = this.props
      fetchCounters()
    }

    render() {
      const {pending, error, counters} = this.props
      return (
        <Fragment>
          <SearchBar></SearchBar>
          {pending && (<ActivityIndicator />)}
          {!pending && counters.length > 0 && (counters.map(counter => <span>{counter.title}</span>))}
        </Fragment>
      )
    }
}

const mapStateToProps = (state) => ({
  error: getCountersError(state),
  counters: getCounters(state),
  pending: getCountersPending(state),
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchCounters: fetchCountersAction  
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)
