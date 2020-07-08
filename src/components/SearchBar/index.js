import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import GlassIcon from '../../icons/Glass.svg'
import Button from '../Button'

import { updateSearchAction, startSearchAction, endSearchAction } from '../../redux/search'
import {
  getIsSearching, getSearchResult, getSearchString, getCounters,
} from '../../redux/reducers'

const SearchInput = styled.input`
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    height: 48px;

    font-family: Avenir Next;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    color: #888B90;
    padding-left: 56px;

    &:focus {
        border: 2px solid rgb(255, 149, 0);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
    } 
`

const SearchIcon = styled(GlassIcon)`
  position: absolute;
  padding-left: 24px;
  pointer-events: none;
  top: 2rem;
`

const SearchContainer = styled.div`
  display: flex;
  height: 48px;

  @media (min-width: 768px) {
      margin: 0 12%;  
    }   

  & button {
    margin-left: 12px;
    color: #4A4A4A;
  }
`

const SearchForm = styled.form`
  flex: 1;
`

const Overlay = styled.div`
  position: fixed; 
  display: block;
  right: 0;
  bottom: 0;
  top: 80px;
  left: 0;
  width: 100%; 
  height: 100%; 
  background-color: rgba(255,255,255,0.8);
  z-index: 50; 
`
class SearchBar extends Component {
  static propTypes = {
    isSearching: PropTypes.bool.isRequired,
    searchString: PropTypes.string.isRequired,
    updateSearch: PropTypes.func.isRequired,
    startSearch: PropTypes.func.isRequired,
    endSearch: PropTypes.func.isRequired,
    counters: PropTypes.array.isRequired,
  }

  handleInputFocus = (evt) => {
    const { startSearch } = this.props
    if (evt.target.value === '') {
      startSearch()
    }
  }

  handleCancelButton = (evt) => {
    evt.preventDefault()
    const { endSearch } = this.props
    endSearch()
  }

  handleInputChange = (evt) => {
    const { updateSearch } = this.props
    updateSearch(evt.target.value)
  }

  handleOnBlur = (evt) => {
    if (evt.target.value === '') {
      const { endSearch } = this.props
      endSearch()
    }
  }

  render() {
    const { isSearching, searchString } = this.props
    return (
      <SearchContainer>
        <SearchForm onSubmit={this.handleCancelButton}>
          <SearchIcon />
          <SearchInput
            onFocus={this.handleInputFocus}
            onBlur={this.handleOnBlur}
            onChange={this.handleInputChange}
            value={searchString}
            placeholder="Search counters"
            type="text"
            name="searchBar"
            data-testid="Search__input"
          />
        </SearchForm>
        {isSearching && (<Button onClick={this.handleCancelButton} theme='secondary' >Cancel</Button>)}
        {isSearching && searchString === '' && (<Overlay />)}
      </SearchContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  isSearching: getIsSearching(state),
  searchResult: getSearchResult(state),
  searchString: getSearchString(state),
  counters: getCounters(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateSearch: updateSearchAction,
  startSearch: startSearchAction,
  endSearch: endSearchAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
