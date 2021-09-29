import {
    createTheme
} from '@mui/material'

import { adaptV4Theme } from '@mui/material/styles';

const primary = {
    main: '#00C804',
    light: '#BEF8BE',
    dark: '#14AF17'
}

const theme = createTheme(adaptV4Theme({
    palette: {
        primary: {
            main: primary.main,
            light: primary.light,
            dark: primary.dark,
        },
        secondary: {
            main: '#A2A2A2',
            light: '#FFFFFF',
            dark: '#000000'
        }
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif"
    },
    components: {
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderWidth: 2,
                    borderRadius: 38,
                    borderColor: primary.main,
                    borderStyle: "solid"
                }
            }
        }
    }
}))

export { theme };