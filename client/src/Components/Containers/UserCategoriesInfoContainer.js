import {
    Box,
    Stack,
    Typography
} from '@mui/material'

function UserCategoriesInfoContainer() {

    return (
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
            <Typography
                sx={{
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '2.5rem'
                }}
            >
                Categories
            </Typography>
            <Box
                borderRadius={16}
                sx={{
                    width: '90%',
                    height: '3px',
                    bgcolor: 'primary.main'
                }}
            />
        </Stack>
    )
}

export default UserCategoriesInfoContainer;