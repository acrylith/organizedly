import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { idb } from '../../idb'

export default function WeatherOptions(props) {
    const [city, setCity] = useState('')
    async function updateCity() {
        try{
            await idb.settings.update('loc', {
                value: city
            })
        } catch(error) {
            alert(error)
        }
        setCity('')
        alert('City changed successfully')
    }
  return (
    <Box>
        <Box>
            <Typography variant='h5'>Location</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4, my: 2 }}>
                <TextField
                    label='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    sx={{ flexGrow: 1 }}
                />
                <Button variant='contained' onClick={updateCity} disabled={city === ''? true : false}>
                    Confirm
                </Button>
            </Box>
        </Box>
    </Box>
  )
}