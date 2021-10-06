import {
  useEffect
} from 'react'

import {
  Switch,
  Route,
  //useHistory
} from 'react-router-dom'

import { ThemeProvider, StyledEngineProvider } from '@mui/material';

import {
  useDispatch,
  useSelector
} from 'react-redux';

import { fetchUser } from './Redux/Slices/userSlice'
import { fetchCategories } from './Redux/Slices/categoriesSlice'
import { fetchTransactions } from './Redux/Slices/transactionsSlice'

import { theme as lightmode } from './Themes/Lightmode'
import UserRoutes from './Components/Routes/UserRoutes'
import Header from './Components/Headers/Header'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Settings from './Pages/Settings'
import Homepage from './Pages/Homepage'

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.entities);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch])

  useEffect(() => {
    user && dispatch(fetchCategories(user.id))
  }, [dispatch, user])

  useEffect(() => {
    user && dispatch(fetchTransactions(user.id))
  }, [dispatch, user])


  return (
    <StyledEngineProvider injectFirst>
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
              <Route path="/settings">
                <Settings />
              </Route>
              :
              null
          }
          {
            user ?
                <Route path="/:username">
                  <UserRoutes />
                </Route>
              :
              null
            //history.push("/")
          }
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
