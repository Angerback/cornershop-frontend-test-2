import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import fetchCountersAction from '../../redux/fetchCounters'
import {
  getCounters, getCountersError, getCountersPending, getIsSearching, getSearchResult,
} from '../../redux/reducers'

import Toolbar from '../../components/Toolbar'
import Centered from '../../components/CenteredWrapper'
import Button from '../../components/Button'

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
      isSearching: PropTypes.bool.isRequired,
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
      const {
        pending, counters, error, fetchCounters, isSearching,
      } = this.props
      return (
        <MainWrapper>
          <SearchBar />
          {counters.length > 0 && <CountersStats />}
          {pending && (
            <Centered>
              <ActivityIndicator />
            </Centered>
          )}
          {!error && !pending && counters.length > 0 && (
            <Counters>
              <AutoSizer>
                {({ height, width }) => (
                  <VariableSizeList
                    height={height}
                    width={width}
                    itemCount={counters.length}
                    itemSize={this.getCounterSize}
                    updateProp={counters.map((counter) => counter.count)
                      .reduce((acc, count) => acc + count)}
                  >
                    {this.Row}
                  </VariableSizeList>
                )}
              </AutoSizer>
            </Counters>
          )}
          {!isSearching && !error && !pending && counters.length === 0 && (
            <Centered>
              <h1>No counters yet</h1>
              <p>“When I started counting my blessings,
                 my whole life turned around.” —Willie Nelson
              </p>
            </Centered>
          )}
          {error && counters.length === 0 && (
            <Centered>
              <h1>Couldn&apos;t load the counters</h1>
              <p>The Internet connection appears to be offline.</p>
              <Button data-testid="Counters__retry-button" onClick={fetchCounters} theme="secondary">Retry</Button>
            </Centered>
          )}
          {!pending && isSearching && counters.length === 0 && (
            <Centered>
              <NoResults>No results</NoResults>
            </Centered>
          )}
          <Toolbar />
        </MainWrapper>
      )
    }
}

const mapStateToProps = (state) => ({
  error: getCountersError(state),
  counters: getIsSearching(state) ? getSearchResult(state) : getCounters(state),
  pending: getCountersPending(state),
  isSearching: getIsSearching(state),
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

const NoResults = styled.span`
  font-weight: 500;
  font-size: 22px;
  line-height: 30px;
  /* identical to box height */

  letter-spacing: 0.02em;

  color: #888B90;
`
