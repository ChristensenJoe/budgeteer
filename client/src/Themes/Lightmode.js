import {
    createTheme
} from '@mui/material'

const theme = createTheme({
    palette: {
        primary: {
            main: '#00C804',
            light: '#BEF8BE', 
            dark: '#14AF17'
        },
        secondary: {
            main: '#A2A2A2',
            light: '#FFFFFF',
            dark: '#000000'
        }
    }, 
    typography: {
        fontFamily: "'Montserrat', sans-serif"
    }
})

export {theme};