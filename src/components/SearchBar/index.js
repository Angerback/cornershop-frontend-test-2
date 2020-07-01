import React, { Component } from 'react'
import styled from 'styled-components'
import {ReactComponent as GlassIcon} from '../../icons/Glass.svg'

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

    padding-left: 56px;

    &::placeholder {
      color: #888B90;
      font-style: normal;
    }

    &:focus {
        border: 2px solid rgb(255, 149, 0);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
    }
`

const SearchIcon = styled(GlassIcon)`
  position: absolute;
  left: 0px;
  padding-left: 38px;
  pointer-events: none;
  top: 2.2rem;
`

export default class SearchBar extends Component {
  render() {
    return (
      <form>
        <SearchInput placeholder="Search counters" type="text" name="searchBar">
            
        </SearchInput>
        <SearchIcon/>
      </form>
    )
  }
}
