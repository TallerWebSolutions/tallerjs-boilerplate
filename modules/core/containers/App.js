import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class App extends Component {
  render() {
    return(
      <div>
        <h1>Lucas!!!</h1>
        {this.props.children}
      </div>
    )
  }
}
