import {
    useEffect,
    useState
} from 'react'

import {
    useLocation
} from 'react-router-dom'

import {
    useSelector
} from 'react-redux'

import {
    Container,
    Box,
    Stack,
    Typography,
    Skeleton
} from '@mui/material'

import CategoryTable from '../Components/Tables/CategoryTable'

function Category() {
    const location = useLocation();
    const user = useSelector(state => state.user.entities)

    const [category, setCategory] = useState(false);


    useEffect(() => {
        fetch(`/users/${user.id}/categories/${location.state}`)
            .then(res => res.json())
            .then(setCategory)
    }, [])


    return (
        <Container>
            {category ? <Box
                sx={{
                    border: '2px solid',
                    borderColor: 'primary.main',
                    borderRadius: 12,
                    height: '800px'
                }}
            >
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        marginTop: '30px',
                        marginBottom: '30px',
                        width: '100%'
                    }}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                        sx={{
                            width: '100%'
                        }}
                    >
                        <Typography
                            sx={{
                                paddingLeft: '45px',
                                fontWeight: 600,
                                fontSize: {
                                    xs: '1.55rem',
                                    sm: '1.95rem',
                                    md: '2.5rem',
                                    lg: '2.7rem'
                                }
                            }}
                        >
                            {category.name}
                        </Typography>
                        <Typography
                            sx={{
                                paddingRight: '45px',
                                fontWeight: 600,
                                color: 'primary.main',
                                fontSize: {
                                    xs: '1.55rem',
                                    sm: '1.95rem',
                                    md: '2.5rem',
                                    lg: '2.7rem'
                                }
                            }}
                        >
                            {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(category.balance)}
                        </Typography>
                    </Stack>
                    <Box
                        borderRadius={16}
                        sx={{
                            width: '95%',
                            height: '3px',
                            bgcolor: 'primary.main'
                        }}
                    />
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                        sx={{
                            width: '100%',
                            paddingTop: '10px',
                            paddingBottom: '40px'
                        }}
                    >
                        <Typography
                            sx={{
                                paddingLeft: '35px',
                                fontWeight: 500,
                                fontSize: {
                                    xs: '1.3rem',
                                    sm: '1.85rem',
                                    md: '2rem',
                                    lg: '2.2rem'
                                }
                            }}
                        >
                            Percentage of Paycheck
                        </Typography>
                        <Typography
                            sx={{
                                paddingRight: '35px',
                                fontWeight: 500,
                                fontSize: {
                                    xs: '1.3rem',
                                    sm: '1.85rem',
                                    md: '2rem',
                                    lg: '2.2rem'
                                }
                            }}
                        >
                            {category.percentage * 100}%
                        </Typography>
                    </Stack>
                    <CategoryTable
                        category={category}
                    />
                </Stack>
            </Box>
                :
                <Stack
                    justifyContent="center"
                    alignItems="center"
                    spacing={4}
                    sx={{
                        marginTop: '80px',
                        marginBottom: '30px',
                        width: '100%'
                    }}
                >
                    <Skeleton
                        animation="wave"
                        sx={{
                            width: '90%',
                            height: '80px',
                            marginBottom: '10px'
                        }}
                    />
                    <Box
                        sx={{
                            display: 'contents'
                        }}
                    >
                        <Skeleton
                            animation="wave"
                            sx={{
                                width: '90%',
                                height: '80px',
                                marginBottom: '50px'
                            }}
                        />
                        <Skeleton
                            animation="wave"
                            variant="rectangular"
                            sx={{
                                width: '90%',
                                height: '600px'
                            }}
                        />
                    </Box>
                </Stack>}
        </Container>
    )
}

export default Category;