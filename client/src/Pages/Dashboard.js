import {
    useParams
} from 'react-router-dom'

import {
    Container,
    styled,
    Paper
} from '@mui/material'

import Masonry from '@mui/lab/Masonry'
import MasonryItem from '@mui/lab/MasonryItem'
import UserBalanceInfo from '../Components/Paper/UserBalanceInfo'
import UserCategoriesInfo from '../Components/Paper/UserCategoriesInfo'
import UserRecentTransactionsInfo from '../Components/Paper/UserRecentTransactionsInfo'

const InfoContainer = styled(Paper)(({ theme }) => ({
    border: '2px solid',
    borderColor: theme.palette.primary.main
}))

function Dashboard() {
    const { username } = useParams();

    return (
        <Container>
            <Masonry
                columns={{ sm: 1, md: 2 }}
                spacing={5}
            >
                <MasonryItem>
                    <InfoContainer
                        sx={{
                            height: '600px',
                            width: '100%'
                        }}
                    >
                        <UserBalanceInfo />
                    </InfoContainer>
                </MasonryItem>
                <MasonryItem>
                    <InfoContainer
                        sx={{
                            height: '1200px',
                            width: '100%'
                        }}
                    >
                        <UserCategoriesInfo />
                    </InfoContainer>
                </MasonryItem>
                <MasonryItem>
                    <InfoContainer
                        sx={{
                            height: '400px',
                            width: '100%'
                        }}
                    >
                        <UserRecentTransactionsInfo />
                    </InfoContainer>
                </MasonryItem>
            </Masonry>
        </Container>
    )
}

export default Dashboard;