import React, { useState, useEffect } from 'react'
import { Box, css, Typography } from '@mui/material'
import dayjs from 'dayjs'

export default function Clock() {
    const [timestamp, setTimestamp] = useState()
    useEffect(() => {
        function update() {
            const date = new Date()
            setTimestamp(date)
        }
        update()

        const interval = setInterval(() => {
            update()
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <Box sx={{ cursor: 'default' }}>
            <Typography sx={DateDispay} component='h3'>
                {dayjs(timestamp).format('dddd, D MMMM')}
            </Typography>
            <Typography sx={DigitalClock} component='h1'>
                {dayjs(timestamp).format('HH:mm')}
            </Typography>
        </Box>
    )
}

const DigitalClock = css({
    fontSize: 82,
    textAlign: 'center',
    fontWeight: 500,
    lineHeight: 1,
    marginBottom: '12px'
})

const DateDispay = css({
    fontSize: 24,
    textAlign: 'center',
    marginBottom: '12px'
})