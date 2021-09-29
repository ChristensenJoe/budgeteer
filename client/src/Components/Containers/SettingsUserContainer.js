import {
    Stack,
    Box,
    Typography
} from '@mui/material'

function SettingsUserContainer() {

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
                noWrap
                align="left"
                sx={{
                    width: '80%',
                    fontWeight: 600,
                    fontSize: {
                        xs: '1.95rem',
                        sm: '2.15rem',
                        md: '1.15rem',
                        lg: '1.8rem'
                    }
                }}
            >
                User Details
            </Typography>
            <Box
                borderRadius="16px"
                sx={{
                    width: '90%',
                    height: '3px',
                    bgcolor: 'primary.main'
                }}
            />
        </Stack >
    );
}

export default SettingsUserContainer