import { Box, css, Modal, Paper, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import TabPanel from "./TabPanel";
import WeatherOptions from "./WeatherOptions";
import CloudIcon from '@mui/icons-material/Cloud';
import WallpaperIcon from '@mui/icons-material/Wallpaper';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import BackGround from "./BackGround";

export default function OptionsModal(props) {
    const {open, onClose} = props
    const [value, setValue] = useState(0)
    const handleValue = (event, newValue) => {
        setValue(newValue)
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Paper variant='outlined' sx={windowStyle}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleValue}>
                        <Tab icon={<CloudIcon />} label='Weather' />
                        <Tab icon={<WallpaperIcon />} label='Background' />
                        <Tab icon={<RssFeedIcon />} label='RSS' disabled />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <WeatherOptions />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <BackGround />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography>RSS</Typography>
                </TabPanel>
            </Paper>
        </Modal>
    )
}

const windowStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 760px;
    height: 600px;
    padding: 12px;
`