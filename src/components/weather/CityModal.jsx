import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import { idb } from '../../idb'

export default function CityModal(props) {
    const [city, setCity] = useState('')
    const closeModal = () => {
        props.onClose()
        setCity('')
    }
    async function updateCity() {
        try{
            await idb.settings.update('loc', {
                value: city
            })
        } catch(error) {
            alert(error)
        }
        setCity('')
        props.onClose()
    }
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Enter your city</DialogTitle>
            <DialogContent>
                <TextField
                    label='City'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    sx={{ my: 2 }}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Cancel</Button>
                <Button variant='contained' onClick={() => updateCity(city)}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}