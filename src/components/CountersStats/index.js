import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import {
  getCounters, getCountersPending, getIsSearching, getSearchResult,
} from '../../redux/reducers'
import fetchCountersAction from '../../redux/fetchCounters'

import RefreshIcon from '../../icons/RefreshIcon.svg'

class CountersStats extends PureComponent {
    static propTypes = {
      counters: PropTypes.array.isRequired,
      pendingCounters: PropTypes.bool.isRequired,
      fetchCounters: PropTypes.func.isRequired,
    }

    handleRefreshClick = () => {
      const { fetchCounters } = this.props
      fetchCounters()
    }

    render() {
      const { counters, pendingCounters } = this.props
      const isRefreshing = counters.length > 0 && pendingCounters
      return (
        <StatsContainer>
          <ItemsCounter>
            {counters.length > 0 && `${counters.length} items`}
          </ItemsCounter>
          <TotalCounter>
            {counters.length > 0 && `${counters.map((counter) => counter.count)
              .reduce((acc = 0, count) => acc + count)} times`}
          </TotalCounter>

          {isRefreshing
            ? (
              <Fragment>
                <RotatingRefresh /> <span style={{ color: '#FF9500' }}>Refreshing...</span>
              </Fragment>
            ) : (<RefreshIcon style={{ cursor: 'pointer' }} onClick={this.handleRefreshClick}/>)
          }
        </StatsContainer>
      )
    }
}

const mapStateToProps = (state) => ({
  counters: getIsSearching(state) ? getSearchResult(state) : getCounters(state),
  pendingCounters: getCountersPending(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  fetchCounters: fetchCountersAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CountersStats)

const StatsContainer = styled.span`
    letter-spacing: 0.02em;
    margin: 22px 7px 6px;
    display: flex;
    align-items: center;
    font-size: 17px;
`

const ItemsCounter = styled.span`
    color: #4A4A4A;
    font-weight: 600;
    margin-right: 7px;
`

const TotalCounter = styled.span`
    font-weight: 500;
    margin-right: 7px;
`

const RotatingRefresh = styled(RefreshIcon)`
    fill: #FF9500;
    -webkit-animation: rotation 2s infinite linear;
    @keyframes rotation {
        from {
         -webkit-transform: rotate(0deg);
        }
        to {
        -webkit-transform: rotate(359deg);
        }
    }
`
