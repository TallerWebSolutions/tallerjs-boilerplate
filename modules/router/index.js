import { routerReducer } from 'react-router-redux'

export default {
  reducer: function (state, action) {
    return Object.assign({}, state, {
      routing: routerReducer(state.routing, action)
    })
  }
}
