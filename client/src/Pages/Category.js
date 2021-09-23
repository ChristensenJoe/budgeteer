import {
    useParams
} from 'react-router-dom'

function Category() {
    const { username, category_name } = useParams();

    return (
        <h1>{username}'s {category_name}</h1>
    )
}

export default Category;