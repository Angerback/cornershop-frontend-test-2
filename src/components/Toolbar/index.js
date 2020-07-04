/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Popup from 'reactjs-popup'
import CreateCounterModal from '../CreateCounterModal'
import Button from '../Button'

import { getSelectedCounter, getCounters } from '../../redux/reducers'

import ExportIcon from '../../icons/ExportIcon.svg'
import TrashIcon from '../../icons/TrashIcon.svg'
import PlusIcon from '../../icons/Plus.svg'
import { selectCounter } from '../../redux/actions'

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

const SelectionButtons = styled.div`
  flex: 1;
  display:flex;
  justify-content: flex-start;

  & button {
    margin-right: 18px;
  }
`

class Toolbar extends PureComponent {
  static propTypes = {
    selectedCounter: PropTypes.string.isRequired,
    counters: PropTypes.array.isRequired,
  }

  static defaultProps = {
    errorCreate: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      createCounterModalOpen: false,
    }
  }

  handleAddCounterClick = (e) => {
    e.preventDefault()
    this.setState({ createCounterModalOpen: true })
  }

  closeCreateCounterModal = () => {
    this.setState({ createCounterModalOpen: false })
  }

  setTooltipLeft = () => {
    const tooltipContainer = document.getElementsByClassName('popup-content')[0]
    if (tooltipContainer) { tooltipContainer.style.left = 'unset' }
  }

  shareCounter = () => {
    const { counters, selectedCounter } = this.props
    const counterToShare = counters.find((counter) => counter.id === selectedCounter)
    const el = document.createElement('textarea')
    el.value = `${counterToShare.count} x ${counterToShare.title}`
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  render() {
    const { createCounterModalOpen } = this.state
    const { selectedCounter } = this.props
    return (
      <ButtonWrapper>
        <Separator />
        {selectedCounter !== '' && (
          <SelectionButtons>
            <Button theme="secondary"><TrashIcon style={{ marginBottom: '-7px' }} /></Button>
            <Popup
              onOpen={this.setTooltipLeft}
              trigger={<Button theme="secondary"><ExportIcon style={{ marginBottom: '-7px' }}/></Button>}
              repositionOnResize
              position="top center"
              on="click"
              contentStyle={{
                background: '#FAFAFA',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '0px 24px 38px rgba(0, 0, 0, 0.14)',
                borderRadius: '10px',
                padding: '0 13px 25px',
              }}

            >
              <Fragment>
                <h1>Share 1 counter</h1>
                <Button onClick={this.shareCounter} theme="secondary">Copy</Button>
              </Fragment>
            </Popup>
          </SelectionButtons>
        )}
        <Button onClick={this.handleAddCounterClick}
          theme="primary"
          data-testid="Toolbar_addCounterButton">
          <PlusIcon style={{
            marginBottom: '-4px',
          }}/>
        </Button>
        <CreateCounterModal
          isModalOpen={createCounterModalOpen}
          closeModal={this.closeCreateCounterModal}
        />
      </ButtonWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedCounter: getSelectedCounter(state),
  counters: getCounters(state),
})

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
