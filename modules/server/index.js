import path from 'path'
import {BOOT} from 'redux-boot'
import {HTTP_BOOT, HTTP_AFTER_BOOT} from 'redux-boot-express'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Html from './components/Html'
import App from '../core/containers/App'

export default {
  reducer: {
    [BOOT]: (state, action) => {
      return Object.assign({}, state, {
        baseDir: path.join(__dirname, '../..')
      });
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

      httpServer.use('/static', express.static(path.join(baseDir, 'dist')));

      httpServer.use((request, response, next) => {

        response.send('<!doctype html>\n' +
            ReactDOM.renderToString(
              <Html assets={assets} store={store} component={<App />}/>
            ));

        next();
      })

      return next(action)
    },
    [HTTP_AFTER_BOOT]: store => next => action => {
      const port = store.getState().variables.port

      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)

      return next(action)
    }
  }
}
