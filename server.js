import boot, {BOOT} from 'redux-boot'
import expressModule, {HTTP_REQUEST} from 'redux-boot-express'
import serverModule from './modules/server'

const initialState = {}

let modules = [
  expressModule,
]

if (process.env.NODE_ENV !== 'production') {
  const webpackDevModule = require('./modules/sandbox/webpack-dev-server').default
  modules.push(webpackDevModule)
}

modules.push(serverModule)

const app = boot(initialState, modules)

app.then(() => {
  console.log('APP HAS STARTED')
})
