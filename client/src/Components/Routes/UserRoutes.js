import {
    Switch,
    Route
} from 'react-router-dom'

import Category from '../../Pages/Category'
import Dashboard from '../../Pages/Dashboard'
import Transactions from '../../Pages/Transactions'

function UserRoutes() {

    return (
        <Switch>
            <Route path="/:username/transactions">
                <Transactions />
            </Route>
            <Route path="/:username/:category_name">
                <Category />
            </Route>
            <Route exact path="/:username">
                <Dashboard />
            </Route>
        </Switch>
    )
}

export default UserRoutes;