import boot, {BOOT} from 'redux-boot'
import expressModule, {HTTP_REQUEST} from 'redux-boot-express'
import serverModule from './modules/server'
import { match } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
// import createHistory from 'react-router/lib/createMemoryHistory';
// import {Provider} from 'react-redux';
// import getRoutes from './routes';

const initialState = {}

const modules = [
  expressModule,
  serverModule
]

const app = boot(initialState, modules)

app.then(() => {
  console.log('APP HAS STARTED')
})
