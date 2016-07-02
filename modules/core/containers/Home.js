import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {Link} from 'react-router'

export default class Home extends Component {
  render() {
    return(
      <h1>
        Homer
        <Link to="/foo">Go to Foo</Link> 
      </h1>
    )
  }
}
