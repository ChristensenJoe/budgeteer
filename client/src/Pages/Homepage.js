import {
    useState,
    useEffect
} from 'react'

import {
    Typography,
    Stack,
    Box,
    useTheme,
    Slide,
    useMediaQuery
} from '@mui/material'

import FadeIn from 'react-fade-in'

import dashboardPreview from '../Assets/Homepage/dashboard-preview.png'
import categoryPreview from '../Assets/Homepage/category-preview.png'
import percentagePreview from '../Assets/Homepage/percentage-preview.png'
import transactionPreview from '../Assets/Homepage/transaction-preview.png'
import dottedLineOne from '../Assets/Homepage/dotted-line-1.png'
import dottedLineTwo from '../Assets/Homepage/dotted-line-2.png'
import logoIcon from '../Assets/logo-icon-transparent.png'

import Footer from '../Components/Footers/Footer'

function Homepage() {
    const theme = useTheme();
    const [transitionPoints, setTransitionPoints] = useState({
        categoryTransition: false,
        transactionTransition: false,
        percentageTransition: false
    })

    const isXS = useMediaQuery(theme.breakpoints.only('xs'));
    const isSM = useMediaQuery(theme.breakpoints.only('sm'));
    const isMD = useMediaQuery(theme.breakpoints.only('md'));
    const isLG = useMediaQuery(theme.breakpoints.only('lg'));

    useEffect(() => {
        const scrollEvent = (e) => {
            var scrollTop = e.path[1].window.pageYOffset
            console.log(scrollTop);
            if (isXS) {
                console.log("xs")
                if (scrollTop > 212) {
                    if (!transitionPoints.categoryTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            categoryTransition: true
                        }))
                    }
                }
                if (scrollTop > 640) {
                    if (!transitionPoints.transactionTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            transactionTransition: true
                        }))
                    }
                }
                if (scrollTop > 950) {
                    if (!transitionPoints.percentageTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            percentageTransition: true
                        }))
                    }
                }
            }
            else if (isSM) {
                console.log('sm')
                if (scrollTop > 400) {
                    if (!transitionPoints.categoryTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            categoryTransition: true
                        }))
                    }
                }
                if (scrollTop > 990) {
                    if (!transitionPoints.transactionTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            transactionTransition: true
                        }))
                    }
                }
                if (scrollTop > 1300) {
                    if (!transitionPoints.percentageTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            percentageTransition: true
                        }))
                    }
                }
            }
            else if (isMD) {
                console.log('md')
                if (scrollTop > 720) {
                    if (!transitionPoints.categoryTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            categoryTransition: true
                        }))
                    }
                }
                if (scrollTop > 1470) {
                    if (!transitionPoints.transactionTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            transactionTransition: true
                        }))
                    }
                }
                if (scrollTop > 2100) {
                    if (!transitionPoints.percentageTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            percentageTransition: true
                        }))
                    }
                }
            }
            else if (isLG) {
                console.log('lg')
                if (scrollTop > 900) {
                    if (!transitionPoints.categoryTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            categoryTransition: true
                        }))
                    }
                }
                if (scrollTop > 1800) {
                    if (!transitionPoints.transactionTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            transactionTransition: true
                        }))
                    }
                }
                if (scrollTop > 2300) {
                    if (!transitionPoints.percentageTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            percentageTransition: true
                        }))
                    }
                }
            }
            else {
                console.log('xl')
                if (scrollTop > 980) {
                    if (!transitionPoints.categoryTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            categoryTransition: true
                        }))
                    }
                }
                if (scrollTop > 1850) {
                    if (!transitionPoints.transactionTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            transactionTransition: true
                        }))
                    }
                }
                if (scrollTop > 2750) {
                    if (!transitionPoints.percentageTransition) {
                        setTransitionPoints((transitionPoints) => ({
                            ...transitionPoints,
                            percentageTransition: true
                        }))
                    }
                }
            }
        }

        window.addEventListener('scroll', scrollEvent);

        return () => { window.removeEventListener('scroll', scrollEvent) }
    }, [transitionPoints, isXS, isSM, isMD, isLG])

    return (
        <>
            <Stack
                sx={{
                }}
            >
                <Box
                    sx={{
                        marginTop: '40px',
                        marginBottom: '120px',
                        height: '30vh',
                        pl: '50px',
                        pr: '50px',
                        pt: '40px',
                        pb: '50px',
                    }}
                >
                    <FadeIn
                        delay={300}
                        transitionDuration={1200}
                    >
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {
                                    xs: '1.3rem',
                                    sm: '1.6rem',
                                    md: '2.55rem',
                                    lg: '3rem',
                                    xl: '3.2rem'
                                },
                                fontWeight: 600
                            }}
                        >
                            Stay on top of your spending with <Typography
                                sx={{
                                    fontSize: {
                                        xs: '2rem',
                                        sm: '2.2rem',
                                        md: '3rem',
                                        lg: '3.4rem',
                                        xl: '3.6rem'
                                    },
                                    fontWeight: 700
                                }}
                            >Budgeteer</Typography>
                        </Typography>
                    </FadeIn>
                    <FadeIn
                        delay={800}
                        transitionDuration={1200}
                    >
                        <Box
                            sx={{
                                width: '55vw',
                                height: 'auto',
                                overflow: 'auto',
                                mt: {
                                    xs: '-20px',
                                    sm: '-20px',
                                    md: '-40px',
                                    lg: '-60px',
                                    xl: '-60px'
                                },
                                float: 'right',
                                textAlign: 'right',
                                boxShadow: '0px 0px 10px #ccc',
                                "& img": {
                                    width: '100%'
                                }
                            }}
                        >
                            <img
                                src={dashboardPreview}
                                alt="dashboard preview"
                            />
                        </Box>
                    </FadeIn>
                </Box>
                <Stack
                    sx={{
                        pl: '50px',
                        pr: '50px',
                        pt: '40px',
                        pb: '300px',
                        background: `linear-gradient(0deg, rgba(218, 252, 218, 1) 0%, rgba(218, 252, 218, 1) 75%, rgba(218, 252, 218, 0) 100%)`
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            mt: {
                                xs: '50px',
                                sm: '200px',
                                md: '400px',
                                lg: '600px',
                                xl: '600px'
                            },
                            height: '100%',
                            padding: {
                                xs: '16px',
                                sm: '16px',
                                md: '40px',
                                lg: '40px',
                                xl: '40px'
                            }
                        }}
                    >
                        <Slide
                            direction="right"
                            timeout={1000}
                            in={transitionPoints.categoryTransition}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '1.3rem',
                                        sm: '1.5rem',
                                        md: '2rem',
                                        lg: '2.4rem',
                                        xl: '2.6rem'
                                    },
                                    fontWeight: 600,
                                    float: 'left',
                                    width: '40vw'
                                }}
                            >
                                Organize your account with custom categories
                            </Typography>
                        </Slide>
                        <Slide
                            direction="left"
                            timeout={1000}
                            in={transitionPoints.categoryTransition}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: '55vw',
                                        sm: '50vw',
                                        md: '50vw',
                                        lg: '50vw',
                                        xl: '50vw'
                                    },
                                    height: 'auto',
                                    overflow: 'auto',
                                    float: 'right',
                                    textAlign: 'right',
                                    boxShadow: '0px 0px 10px #ccc',
                                    "& img": {
                                        width: '100%'
                                    }
                                }}
                            >
                                <img
                                    src={categoryPreview}
                                    alt="category preview"
                                />
                            </Box>
                        </Slide>
                    </Stack>
                    <Box
                        sx={{
                            mt: '50px',
                            mb: '50px',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src={dottedLineOne}
                            alt="dotted line one"
                        />
                    </Box>
                    <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height: '100%',
                            padding: {
                                xs: '16px',
                                sm: '16px',
                                md: '40px',
                                lg: '40px',
                                xl: '40px'
                            }
                        }}
                    >
                        <Slide
                            direction="right"
                            timeout={1000}
                            in={transitionPoints.transactionTransition}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '1.3rem',
                                        sm: '1.5rem',
                                        md: '2rem',
                                        lg: '2.4rem',
                                        xl: '2.6rem'
                                    },
                                    fontWeight: 600,
                                    float: 'left',
                                    width: '40vw'
                                }}
                            >
                                Track your spending with transactions and money transfers
                            </Typography>
                        </Slide>
                        <Slide
                            direction="left"
                            timeout={1000}
                            in={transitionPoints.transactionTransition}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: '55vw',
                                        sm: '50vw',
                                        md: '50vw',
                                        lg: '50vw',
                                        xl: '50vw'
                                    },
                                    height: 'auto',
                                    overflow: 'auto',
                                    float: 'right',
                                    textAlign: 'right',
                                    boxShadow: '0px 0px 10px #ccc',
                                    "& img": {
                                        width: '100%'
                                    }
                                }}
                            >
                                <img
                                    src={transactionPreview}
                                    alt="transaction preview"
                                />
                            </Box>
                        </Slide>
                    </Stack>
                    <Box
                        sx={{
                            mt: '50px',
                            mb: '50px',
                            textAlign: 'center'
                        }}
                    >
                        <img
                            src={dottedLineTwo}
                            alt="dotted line one"
                            style={{
                                width: '300px',
                                height: '300px'
                            }}
                        />
                    </Box>
                    <Stack
                        direction="row"
                        spacing={4}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            height: '100%',
                            padding: {
                                xs: '16px',
                                sm: '16px',
                                md: '40px',
                                lg: '40px',
                                xl: '40px'
                            }
                        }}
                    >
                        <Slide
                            direction="right"
                            timeout={1000}
                            in={transitionPoints.percentageTransition}
                        >
                            <Typography
                                sx={{
                                    fontSize: {
                                        xs: '1.3rem',
                                        sm: '1.5rem',
                                        md: '2rem',
                                        lg: '2.4rem',
                                        xl: '2.6rem'
                                    },
                                    fontWeight: 600,
                                    float: 'left',
                                    width: '40vw'
                                }}
                            >
                                Distribute your paycheck automatically with custom category allocations
                            </Typography>
                        </Slide>
                        <Slide
                            direction="left"
                            timeout={1000}
                            in={transitionPoints.percentageTransition}
                        >
                            <Box
                                sx={{
                                    width: {
                                        xs: '55vw',
                                        sm: '50vw',
                                        md: '50vw',
                                        lg: '50vw',
                                        xl: '50vw'
                                    },
                                    height: 'auto',
                                    overflow: 'auto',
                                    float: 'right',
                                    textAlign: 'right',
                                    boxShadow: '0px 0px 10px #ccc',
                                    "& img": {
                                        width: '100%'
                                    }
                                }}
                            >
                                <img
                                    src={percentagePreview}
                                    alt="precentage preview"
                                />
                            </Box>
                        </Slide>
                    </Stack>
                </Stack>
            </Stack>
            <Footer />
        </>
    )
}

export default Homepage