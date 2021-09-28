import {
    useState
} from 'react'

import {
    useSelector
} from 'react-redux'

import {
    Box,
    Stack,
    Typography,
    Button,
    alpha
} from '@mui/material'


import UserCategoriesItem from '../Items/UserCategoriesItem'
import NewCategoryDialog from '../Dialogs/NewCategoryDialog'

function UserCategoriesInfoContainer() {
    const categories = useSelector((state) => state.categories.entities)

    const [isOpen, setIsOpen] = useState(false)


    return (
        <>
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
                <Button
                    variant="contained"
                    disableElevation
                    onClick={() => { setIsOpen((isOpen) => !isOpen) }}
                    sx={{
                        bgcolor: 'primary.light',
                        width: '90%',
                        marginTop: '5px',
                        '&:hover': {
                            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2)
                        }
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: '1.8rem'
                        }}
                    >
                        New Category
                    </Typography>
                </Button>
            </Stack>
            <NewCategoryDialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />
        </>
    )
}

export default UserCategoriesInfoContainer;