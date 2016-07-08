jest.unmock('../Html')
jest.unmock('react-helmet')
jest.unmock('redux-boot')

import React from 'react'
import { shallow, mount, render } from 'enzyme'

import Html from '../Html'
import styles from '../Html.css'

import boot, {BOOT} from 'redux-boot'

describe('Component: Html', () => {

  it('should contain a content div', async () => {
    const assets = {
      styles: {},
      javascript: {
        main: "/static/bundle.js"
      }
    }
    const {store} = await boot({}, [])
    const component = <h1>Hello!</h1>

    const props = {
      assets,
      store,
      component
    }

    const HtmlWrapper = render(<Html {...props} />)
    expect(HtmlWrapper.find('h1').text()).toBe('Hello!')
  })

})
