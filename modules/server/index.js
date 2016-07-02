import path from 'path'
import {HTTP_BOOT, HTTP_AFTER_BOOT} from 'redux-boot-express'
import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'
import Html from './components/Html';

export default {
  reducer: {
    [HTTP_AFTER_BOOT]: (state, action) => {
      const port = state.variables.port
      console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
      return state
    }
  },
  middleware: {
    [HTTP_BOOT]: store => next => action => {

      const {httpServer} = action.payload

      httpServer.use((request, response, next) => {

        response.send('<!doctype html>\n' +
            ReactDOM.renderToString(
              <Html store={store}/>
            ));

        next();
      })


      // httpServer.get('/', (req, res) => {
      //   res.sendFile(path.resolve(__dirname + '/index.html'))
      // })
      //
      // if (process.env.NODE_ENV === 'production') {
      //   httpServer.use('/static', express.static('dist'));
      // }

      return next(action)
    }
  }
}
