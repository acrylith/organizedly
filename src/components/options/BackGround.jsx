import { useEffect, useState } from 'react'
import { Box, Typography, Link, TextField, Button, FormGroup, FormControlLabel, Checkbox } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Pexels from './Pexels'
import { useMutation } from '@tanstack/react-query';
import { idb } from '../../idb';
import { fileToDataUri } from '../../utils';
import { useLiveQuery } from 'dexie-react-hooks';

export default function BackGround() {
    const [searchQuery, setSearchQuery] = useState('')
    const isBlured = useLiveQuery(async () => await idb.settings.where('name').equals('blur').first().then(data => data?.isBlured))
    const toggleBlur = useMutation(
        async (checked) => {
            idb.settings.put({
                name: 'blur',
                isBlured: checked
            })
        }
    )
    const handleSearch = (event) => {
        event.preventDefault()
        if (event.target[0].value !== '') {
            setSearchQuery(event.target[0].value)
        }
    }
    const bgFile = useMutation(
        async (file) => {
            if (file) {
                const base64 = await fileToDataUri(file)
                await idb.settings.put({
                    name: 'bg',
                    base64: base64
                })
            }
        }
    )
    return (
        <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>Background</Typography>  
            <Box component='form' id='searchForm' onSubmit={handleSearch} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <TextField sx={{ flexGrow: 1 }} label='Search image on Pexel' variant="outlined" name="searchpexelimage" />
                <Button type='submit' variant="contained"><SearchIcon /></Button>
                <Button variant='contained' component='label'>
                    Choose from device...
                    <input
                        hidden
                        type='file'
                        accept="image/*"
                        name='imageUpload'
                        onChange={(e) => bgFile.mutate(e.target.files[0] || null)}
                    />
                </Button>
            </Box>
            <Box sx={{ my: 2, px: 1 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={isBlured !== undefined ? isBlured : false}
                            onChange={(e) => toggleBlur.mutate(e.target.checked)}
                        />
                    }
                    label='Blur'
                />
            </Box>
            {
                searchQuery !== '' ? <Pexels searchQuery={searchQuery} /> : null
            }
        </Box>
    )
}
