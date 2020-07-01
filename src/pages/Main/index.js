import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import fetchCountersAction from '../../redux/fetchCounters'
import {getCounters, getCountersError, getCountersPending} from '../../redux/reducers'

import {ReactComponent as ActivityIndicator } from '../../icons/activityIndicator.svg'
import SearchBar from '../../components/SearchBar'
import Button from '../../components/Button'
import {ReactComponent as PlusIcon} from '../../icons/Plus.svg'

import styled from 'styled-components'

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
`

const CenteredText = styled.div`
  flex: 1;
  align-content: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`

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
        <div style={{
          padding: '16px',
          height: '100%',
        }}>
          <section style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <SearchBar></SearchBar>
            {pending && (<ActivityIndicator />)}
            {!pending && counters.length > 0 && (counters.map(counter => <span>{counter.title}</span>))}
            {!pending && counters.length === 0 && (
              <CenteredText>
                <h1>No counters yet</h1>
                <p>“When I started counting my blessings, my whole life turned around.” —Willie Nelson</p>
              </CenteredText>
            )}
            <ButtonWrapper>
              <Separator />
              <Button  theme="primary"><PlusIcon style={{
                marginBottom: '-4px'
              }}/></Button>
            </ButtonWrapper>
          </section>
            
        </div>
        
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
