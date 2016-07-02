import boot, {BOOT} from 'redux-boot'
import expressModule, {HTTP_REQUEST} from 'redux-boot-express'
import serverModule from './modules/server'

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
  middleware: {
    [HTTP_REQUEST]: store => next => action => {

      // console.log(action.payload.request)

      return next(action)
    }
  }
}

const modules = [
  exampleModule,
  expressModule,
  serverModule
]

const app = boot(initialState, modules)

app.then(() => {
  console.log('APP HAS STARTED')
})
