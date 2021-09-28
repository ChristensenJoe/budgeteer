
import {
    Grid,
    Container,
    Box,
    Stack,
    styled
} from '@mui/material'

import SettingsPaymentContainer from '../Components/Containers/SettingsPaymentContainer'
import SettingsAccountContainer from '../Components/Containers/SettingsAccountContainer'
import SettingsUserContainer from '../Components/Containers/SettingsUserContainer'

const InfoContainer = styled(Box)(({ theme }) => ({
    border: '2px solid',
    borderColor: theme.palette.primary.main
}))

function Settings() {

    return (
        <Container
            sx={{
                marginTop: '20px',
                marginBottom: '20px'
            }}
        >
            <Grid
                container
                spacing={5}
            >
                <Grid
                    item
                    md={7}
                    sm={12}
                    xs={12}
                >
                    <Stack
                        spacing={5}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <InfoContainer
                            borderRadius={12}
                            sx={{
                                height: '400px',
                                width: '100%'
                            }}
                        >
                            <SettingsPaymentContainer />
                        </InfoContainer>
                        <InfoContainer
                            borderRadius={12}
                            sx={{
                                height: '400px',
                                width: '100%'
                            }}
                        >
                            <SettingsAccountContainer />
                        </InfoContainer>
                    </Stack>
                </Grid>
                <Grid
                    item
                    md={5}
                    sm={12}
                    xs={12}
                >
                    <InfoContainer
                        borderRadius={12}
                        sx={{
                            minHeight: '850px',
                            width: '100%'
                        }}
                    >
                        <SettingsUserContainer />
                    </InfoContainer>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Settings;