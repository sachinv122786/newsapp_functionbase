import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import loading from './loading.gif'

export class Spinner extends Component {
//   static propTypes = {

//   }

  render() {
    return (
      <div className='d-flex justify-content-center my-3'>
        <img src={loading} alt='Loading'></img>
      </div>
    )
  }
}

export default Spinner
