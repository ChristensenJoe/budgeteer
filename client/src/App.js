import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import { 
  ThemeProvider
} from '@mui/material'

import { theme as lightmode } from './Themes/Lightmode'
import UserRoutes from './Components/Routes/UserRoutes'
import Header from './Components/Headers/Header'

function App() {
  return (
    <ThemeProvider theme={lightmode}>
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <h1>Login</h1>
          </Route>
          <Route path="/signup">
            <h1>Signup</h1>
          </Route>
          <Route path="/settings">
            <h1>Settings</h1>
          </Route>
          <Route path="/:username">
            <UserRoutes />
          </Route>
          <Route exact path="/">
            <h1>Homepage</h1>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
