import boot, {BOOT} from 'redux-boot'
import expressModule, {HTTP_REQUEST} from 'redux-boot-express'

const initialState = {}

const exampleModule = {
  reducer: {
    [BOOT]: (state, action) => {
      return {
        ...state,
        foo: action.payload
      }
    },
    [HTTP_REQUEST]: (state, action) => {

      console.log(action.request)

      return state
    }
  }
}

const modules = [
  exampleModule,
  expressModule
]

const app = boot(initialState, modules)

app.then(() => {
  console.log('APP HAS STARTED')
})