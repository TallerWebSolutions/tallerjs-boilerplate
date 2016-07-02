import React from 'react'
import {IndexRoute, Route} from 'react-router'

import App from './containers/App'
import Home from './containers/Home'

const Foo = (props) => <h1>Foooooooo</h1>

export default (store) => {
  // Keep routes in alphabetical order
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      <Route path="/foo" component={Foo} />
    </Route>
  )
}
