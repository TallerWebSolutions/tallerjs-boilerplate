import path from 'path'
import boot, {BOOT} from 'redux-boot'
import {HTTP_BOOT, HTTP_AFTER_BOOT} from 'redux-boot-express'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Html from './components/Html'
import {createAction} from 'redux-actions'

import { match, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
// import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect'
import createHistory from 'react-router/lib/createMemoryHistory'
import {Provider} from 'react-redux'

import getRoutes from '../core/routes'

import routerModule from '../router'

import {
  SERVER_RENDERING,
} from './constants'

export default {
  reducer: {
    [BOOT]: (state, action) => {
      return Object.assign({}, state, {
        baseDir: path.join(__dirname, '../..')
      })
    }
  },
  middleware: {
    [HTTP_BOOT]: store => next => action => {

      const {httpServer} = action.payload
      const assets = {
        styles: {},
        javascript: {
          main: "/static/bundle.js"
        }
      }
      const baseDir = store.getState().baseDir

      httpServer.use('/static', express.static(path.join(baseDir, 'dist')))

      // Express request.
      httpServer.use((request, response, nextServer) => {

        // WebApp modules.
        const webappModules = [
          routerModule,
        ]
        
        // WebApp Bootstrap.
        // @TODO: create universal redux-boot app.
        const webapp = boot({}, webappModules).then(({store}) => {

          const memoryHistory = createHistory(request.originalUrl)
          const history = syncHistoryWithStore(memoryHistory, store)

          // React Router request.
          match({
            history,
            routes: getRoutes(store),
            location: request.originalUrl
          }, (error, redirectLocation, renderProps) => {

            const component = (
              <Provider store={store}>
                <Router {...renderProps} />
              </Provider>
            )

            // Response the Express request.
            response.send('<!doctype html>\n' +
              ReactDOM.renderToString(
                <Html assets={assets} store={store} component={component}/>
              ))
            
            nextServer()
          })


        })
        
      })

      return next(action)
    },

    // [SERVER_RENDERING]: store => next => action => {

    //   return next(action)
    // },

    [HTTP_AFTER_BOOT]: store => next => action => {
      const port = store.getState().variables.port

      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)

      return next(action)
    }
  }
}

export const renderServer = createAction(SERVER_RENDERING, () => {
  return 'foo'
})
