import {
    //useParams
} from 'react-router-dom'

import {
    Container,
    Grid,
    styled,
    Box
} from '@mui/material'


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
                            <InfoContainer
                                borderRadius={12}
                                sx={{
                                    height: '100%',
                                    width: '100%'
                                }}
                            >
                                <UserBalanceInfoContainer />
                            </InfoContainer>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <InfoContainer
                                borderRadius={12}
                                sx={{
                                    height: '400px',
                                    width: '100%'
                                }}
                            >
                                <UserRecentTransactionsInfoContainer />
                            </InfoContainer>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={7}
                >
                    <InfoContainer
                        borderRadius={12}
                        sx={{
                            minHeight: '1000px',
                            width: '100%'
                        }}
                    >
                        <UserCategoriesInfoContainer />
                    </InfoContainer>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Dashboard;