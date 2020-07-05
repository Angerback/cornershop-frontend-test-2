import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import fetchCountersAction from '../../redux/fetchCounters'
import { getCounters, getCountersError, getCountersPending } from '../../redux/reducers'

import Toolbar from '../../components/Toolbar'
import Centered from '../../components/CenteredWrapper'

import ActivityIndicator from '../../icons/activityIndicator.svg'
import SearchBar from '../../components/SearchBar'
import Counter from '../../components/Counter'
import CountersStats from '../../components/CountersStats'

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

    getCounterSize = (index) => {
      const { counters } = this.props
      return (Math.ceil(counters[index].title.length / 50) * 40) + 15
    }

    Row = ({ index, style }) => {
      const { counters } = this.props
      return (
        <div style={style}>
          <Counter counter={counters[index]} />
        </div>
      )
    }

    render() {
      const { pending, counters } = this.props
      return (
        <MainWrapper>
          <SearchBar />
          {counters.length > 0 && <CountersStats />}
          {pending && (
            <Centered>
              <ActivityIndicator />
            </Centered>
          )}
          {!pending && counters.length > 0 && (
            <Counters>
              <AutoSizer>
                {({ height, width }) => (
                  <VariableSizeList
                    height={height}
                    width={width}
                    itemCount={counters.length}
                    itemSize={this.getCounterSize}
                    updateProp={counters.reduce((acc = 0, counter) => acc + counter.count)}
                  >
                    {this.Row}
                  </VariableSizeList>
                )}
              </AutoSizer>
            </Counters>
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
        </MainWrapper>
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

const MainWrapper = styled.div`
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width:66%;
    max-width: 570px;
  }
`
const Counters = styled.div`
  flex: 1;
`
