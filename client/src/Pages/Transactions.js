import {
    useParams
} from 'react-router-dom'

function Transitions() {
    const { username } = useParams();

    return (
        <h1>{username}'s Transactions</h1>
    )
}

export default Transitions;