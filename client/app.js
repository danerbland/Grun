import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <div id="background-image" className="background-image" />
      <div id="white-scrim" />
      <div id="scrim" className="scrim" />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
