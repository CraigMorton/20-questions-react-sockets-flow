import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import SelectRole from '../components/SelectRole'
import GuesserContainer from '../containers/GuesserContainer'
import ChooserContainer from '../containers/ChooserContainer'
import TitleBar from '../components/TitleBar'

const RouterWrapper = () => (
  <HashRouter>
    <div>
      <Route path='/'
        component={TitleBar}
      />
      <Route exact path='/' component={SelectRole} />
      <Route path='/guesser' component={GuesserContainer} />
      <Route path='/chooser' component={ChooserContainer} />
    </div>
  </HashRouter>
)

export default RouterWrapper
