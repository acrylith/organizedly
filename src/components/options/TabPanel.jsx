import { Box } from "@mui/system";
import { css } from "@mui/material"

export default function TabPanel(props) {
    const { value, index, children, ...other } = props
    return (
        <Box
            role='tabpanel'
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={scrollable}>
                    {children}
                </Box>
            )}
        </Box>
    )
}

const scrollable = css({
    paddingTop: '12px',
    paddingBottom: '12px',
    paddingRight: '6px',
    height: '500px',
    overflow: 'auto',
    '::-webkit-scrollbar': {
        width: '6px'
    },
    '::-webkit-scrollbar-track': {
        backgroundColor: 'transparent'
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        borderRadius: '14px',
        transition: 'all .4s',
        '&:hover': {
            backgroundColor: 'rgba(140, 140, 140, 1)'
        }
    }
})