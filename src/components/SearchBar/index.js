import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SearchInput = styled.input`
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.02);
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    height: 48px;

    font-family: Avenir Next;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    color: #888B90;

    &:focus {
        border: 2px solid #FF9500;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
    }
`

export default class SearchBar extends Component {
    static propTypes = {
      
    }

    render() {
      return (
        <form>
          <SearchInput type="text" name="searchBar"></SearchInput>
        </form>
      )
    }
}
