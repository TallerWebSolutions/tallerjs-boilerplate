import React from 'react'
import boot, { BOOT } from 'redux-boot'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './modules/core/containers/App'

const initialState = {}

const exampleModule = {
  reducer: {
    [BOOT]: (state, action) => {
      return {
        ...state,
        foo: action.payload
      }
    }
  },
}

const modules = [
  exampleModule,
]

const app = boot(initialState, modules)

app.then(({ action, store }) => {
  // Save state in local storage.
  // store.subscribe(() => {
  //   const state = store.getState()
  //   localStorage.setItem('state', JSON.stringify(state))
  // })

  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('content')
  )
})
