import {
    useEffect
} from 'react'

import {
    useDispatch,
    useSelector
} from 'react-redux'

import {
    Box,
    Stack,
    Typography
} from '@mui/material'

import { fetchCategories } from '../../Redux/Slices/categoriesSlice'

import UserCategoriesItem from '../Items/UserCategoriesItem'

function UserCategoriesInfoContainer() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.entities);
    const categories = useSelector((state) => state.categories.entities)

    useEffect(() => {
        dispatch(fetchCategories(user.id))
    }, [dispatch])


    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
                marginTop: '30px',
                marginBottom: '30px',
                width: '100%'
            }}
        >
            <Typography
                sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '2.5rem',
                    marginBottom: '10px'
                }}
            >
                Categories
            </Typography>
            <Box
                borderRadius={16}
                sx={{
                    width: '90%',
                    height: '3px',
                    bgcolor: 'primary.main',
                    marginBottom: '10px'
                }}
            />
            {
                categories.map((category) => (
                    <Box
                        key={category.id}
                        sx={{
                            display: 'contents'
                        }}
                    >
                    <UserCategoriesItem 
                        name={category.name}
                        balance={category.balance}
                        percentage={category.percentage}
                        id={category.id}
                    />
                    <Box
                    borderRadius={16}
                    sx={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: '90%',
                        height: '1px',
                        bgcolor: 'secondary.main'
                    }}
                />
                </Box>
                ))
            }
        </Stack>
    )
}

export default UserCategoriesInfoContainer;