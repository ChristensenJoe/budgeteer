import {
    Container,
    Grid,
    styled,
    Box
} from '@mui/material'

import FadeIn from 'react-fade-in'


import UserBalanceInfoContainer from '../Components/Containers/UserBalanceInfoContainer'
import UserCategoriesInfoContainer from '../Components/Containers/UserCategoriesInfoContainer'
import UserRecentTransactionsInfoContainer from '../Components/Containers/UserRecentTransactionsInfoContainer'

const InfoContainer = styled(Box)(({ theme }) => ({
    border: '2px solid',
    borderColor: theme.palette.primary.main
}))

function Dashboard() {

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
                    xs={12}
                    sm={12}
                    md={5}
                >
                    <Grid
                        container
                        spacing={5}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <FadeIn
                                delay={500}
                                transitionDuration={1900}
                            >
                            <InfoContainer
                                borderRadius={12}
                                sx={{
                                    height: '100%',
                                    width: '100%'
                                }}
                            >
                                <UserBalanceInfoContainer />
                            </InfoContainer>
                            </FadeIn>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <FadeIn
                                delay={1200}
                                transitionDuration={1900}
                            >
                            <InfoContainer
                                borderRadius={12}
                                sx={{
                                    minHeight: '440px',
                                    width: '100%'
                                }}
                            >
                                <UserRecentTransactionsInfoContainer />
                            </InfoContainer>
                            </FadeIn>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={7}
                >
                    <FadeIn
                    delay={2000}
                    transitionDuration={1900}
                    >
                    <InfoContainer
                        borderRadius={12}
                        sx={{
                            minHeight: '800px',
                            width: '100%'
                        }}
                    >
                        <UserCategoriesInfoContainer />
                    </InfoContainer>
                    </FadeIn>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard;