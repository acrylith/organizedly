import { Box, css, SvgIcon, Typography } from '@mui/material'
import { useLiveQuery } from 'dexie-react-hooks'
import React, { useState, useEffect } from 'react'
import { idb } from '../../idb'

export default function Weather() {
    const [city, setCity] = useState(null)
    const [temp, setTemp] = useState(null)
    const [desc, setDesc] = useState(null)
    const [icon, setIcon] = useState(null)
    const [cod, setCod] = useState(null)
    const querry = useLiveQuery(
        () => idb.settings
            .where('name')
            .equals('loc')
            .first()
    )
    useEffect(() => {
        if(querry !== undefined) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${querry.value}&appid=f99b9b7c75c5b7ac63b54c02c3077945&units=metric`)
            .then(res => res.json())
            .then(json => {
                if (json.cod === 200) {
                    setCity(json.name)
                    setTemp(json.main.temp)
                    setDesc(json.weather[0].description)
                    setIcon(json.weather[0].icon)
                    setCod(json.cod)
                } else {
                    setCod(json.cod)
                    console.log(json)
                }
            })
        }
    }, [querry])
    return (
        <>
            {cod !== null ?
                <Box sx={wrapper}>
                    <Box sx={weatherImage}>
                        {icon !== null ?
                            <img src={`./icons/${icon}.svg`} alt='clear' /> :
                            <Typography sx={{ fontSize: 72 }}>?</Typography>
                        }
                        
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', px: 4 }}>
                        <Typography sx={{ fontSize: 18, fontWeight: 400 }} onClick={openHandler}>
                            {city !== null ? city : 'Click to enter your city'}
                        </Typography>
                        <Typography sx={{ fontSize: 42, fontWeight: 600 }}>
                            {temp !== null ? `${Math.round(temp)}°C` : null}
                        </Typography>
                        <Typography sx={{ textTransform: 'capitalize' }}>
                            {desc !== null ? desc : null}
                        </Typography>
                    </Box>
                </Box>
                :
                <Box sx={wrapper}>
                    <Typography sx={{ fontSize: 36 }}>
                        Loading...
                    </Typography>
                </Box>
            }
        </>
    )
}

const wrapper = css({
    position: 'absolute',
    display: 'flex',
    bottom: 0,
    right: 0,
    padding: '12px',
    color: 'white',
    cursor: 'default'
})

const weatherImage = css({
    width: '120px',
    height: '120px',
    'img' : {
        width: '100%',
        height: '100%'
    }
})