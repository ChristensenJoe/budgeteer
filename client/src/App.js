import {
  useEffect
} from 'react'

import {
  Switch,
  Route,
  //useHistory
} from 'react-router-dom'

import {
  ThemeProvider
} from '@mui/material'

import {
  useDispatch,
  useSelector
} from 'react-redux';

import { fetchUser } from './Redux/Slices/userSlice'

import { theme as lightmode } from './Themes/Lightmode'
import UserRoutes from './Components/Routes/UserRoutes'
import Header from './Components/Headers/Header'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

function App() {
  //const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.entities);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])

  return (
    <ThemeProvider theme={lightmode}>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          {
            user ?
            (<>
              <Route path="/settings">
                <h1>Settings</h1>
              </Route>
              <Route path="/:username">
                <UserRoutes />
              </Route>
            </>)
            :
            null
            //history.push("/")
          }
          <Route exact path="/">
            <h1>Homepage</h1>
          </Route>
        </Switch>
    </ThemeProvider>
  );
}

export default App;
