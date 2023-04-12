import { Box } from "@mui/system";

export default function TabPanel(props) {
    const { value, index, children, ...other } = props
    return (
        <Box
            role='tabpanel'
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ padding: '12px 0', height: '500px', overflow: 'auto' }}>
                    {children}
                </Box>
            )}
        </Box>
    )
}
