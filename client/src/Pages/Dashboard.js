import {
    useParams
} from 'react-router-dom'

function Dashboard() {
    const { username } = useParams();

    return (
        <h1>{username}'s dashboard</h1>
    )
}

export default Dashboard;