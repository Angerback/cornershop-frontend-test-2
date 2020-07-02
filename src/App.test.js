import React from 'react'
import { mount } from 'enzyme'

import { MemoryRouter } from 'react-router'
import App from './App'
import WelcomePage from './pages/Welcome'

import {LoadableComponent} from '@loadable/component'

describe('main App test', () => {
  test('should show welcome page', async () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[ '/welcome' ]}>
        <App/>
      </MemoryRouter>
    )
    await LoadableComponent.loadingPromise
    expect(wrapper.find(WelcomePage)).toHaveLength(1)
  })
})