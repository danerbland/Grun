import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <div id="scrim" className="scrim" />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
