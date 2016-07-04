import path from 'path'
import boot, {BOOT} from 'redux-boot'
import {HTTP_BOOT, HTTP_AFTER_BOOT} from 'redux-boot-express'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Html from './components/Html'
import {createAction} from 'redux-actions'

import { match, RouterContext } from 'react-router'
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

      const baseDir = store.getState().baseDir

      if (process.env.NODE_ENV === 'production') {
        httpServer.use('/static', express.static(path.join(baseDir, 'dist')))
      }

      // Express request.
      httpServer.use((request, response, nextServer) => {

        // WebApp modules.
        const webappModules = [
          routerModule,
        ]
        
        // WebApp Bootstrap.
        // @TODO: create universal redux-boot app.
        const webapp = boot({}, webappModules).then(webapp => {

          const memoryHistory = createHistory(request.originalUrl)
          const history = syncHistoryWithStore(memoryHistory, webapp.store)

          // React Router request.
          match({
            history,
            routes: getRoutes(webapp.store),
            location: request.originalUrl
          }, (error, redirectLocation, renderProps) => {

            let assets = {
              styles: {},
              javascript: {}
            }
            if (process.env.NODE_ENV === 'production') {

              let assets = {
                styles: {},
                javascript: {
                  main: "/static/bundle.js"
                }
              }
            }

            if (process.env.DISABLE_SSR) {
              
              // Response the Express request
              // without server side rendering.
              response.send('<!doctype html>\n' +
                ReactDOM.renderToString(
                  <Html assets={assets} store={webapp.store} />
                ))
            }
            else {

              // Root React component.
              const component = (
                <Provider store={webapp.store}>
                  <RouterContext {...renderProps} />
                </Provider>
              )

              // Response the Express request
              // with server side rendering.
              response.send('<!doctype html>\n' +
                ReactDOM.renderToString(
                  <Html assets={assets} store={webapp.store} component={component} />
                ))
            }
            
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
