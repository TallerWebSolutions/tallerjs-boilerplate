import React from 'react'
import boot, { BOOT } from 'redux-boot'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './modules/core/containers/App'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import routerModule from 'app/modules/router'
import createRoutes from 'app/modules/core/routes'

const initialState = {}

const modules = [
  routerModule,
]

export const app = boot(initialState, modules)

app.then(({ action, store }) => {
  // Save state in local storage.
  // store.subscribe(() => {
  //   const state = store.getState()
  //   localStorage.setItem('state', JSON.stringify(state))
  // })

  const history = syncHistoryWithStore(browserHistory, store)

  const Routes = createRoutes(store)

  render(
    <Provider store={store}>
      <Router history={history}>
        {Routes}
      </Router>
    </Provider>,
    document.getElementById('content')
  )
})
