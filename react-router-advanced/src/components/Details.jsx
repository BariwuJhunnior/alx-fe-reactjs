import React from 'react'
import { Link } from 'react-router-dom'

function Details() {
  return (
    <div>
      <Link to='/'>Home</Link>

      <h1 style={{display: 'flex', justifyContent:'center', alignItems: 'center', height: '50vh'}}>Welcome to the details page.</h1>
    </div>
  )
}

export default Details
