import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, DialogContentText, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { idb } from '../../idb'

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
        resolve(e.target.result)
    }
    reader.readAsDataURL(file)
})

export default function EditModal(props) {
    const { dial } = props
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [mode, setMode] = useState('upload')
    const [img, setImg] = useState('')
    const [file, setFile] = useState(null)

    const handleChange = (e) => {
        setMode(e.target.value)
        setImg('')
        setFile(null)
    }

    const handleFile = (file) => {
        if(!file) {
            setFile(null)
            return
        }
        fileToDataUri(file).then(dataUri => {setFile(dataUri)})
    }

    async function editBookMark() {
        try {
            const id = await idb.bookmarks.update(dial.id, {
                ...(title !== '') && {title: title},
                ...(url !== '') && {url: url}, 
                ...(file !== null) && {img: file},
                ...(img !== '') && {
                    img: await fetch(`https://api.allorigins.win/raw?url=${img}`)
                    .then(response => response.blob())
                    .then(blob => fileToDataUri(blob)
                    .then(
                        function(dataUri) {
                            return dataUri
                            }
                        )
                    )
                }
            })
            // alert(`Bookmark ${title} Updated. Got code ${id}`)
            setTitle('')
            setUrl('')
            setImg('')
            props.onClose()
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>Edit Bookmark</DialogTitle>
            <DialogContent>
                <TextField
                    label='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    sx={{ margin: '12px 0' }}
                />
                <TextField
                    label='URL adress'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    fullWidth
                    sx={{ margin: '12px 0' }}   
                />
                <RadioGroup
                    sx={{ margin: '12px 0' }}
                    value={mode}
                    onChange={handleChange}
                >
                    <FormControlLabel value='upload' control={<Radio />} label='Upload own image' />
                    <FormControlLabel value='url' control={<Radio />} label='Enter image URL' />
                </RadioGroup>
                {
                    mode === 'upload' ?
                    <Box sx={{ border: '1px solid rgba(255, 255, 255, 0.23)', borderRadius: '4px', padding: '12px', margin: '12px 0' }}>
                        <Button variant='contained' component='label'>
                            Choose File...
                            <input hidden accept="image/*" type='file' name='imageUpload' onChange={(e) => handleFile(e.target.files[0] || null)} />
                        </Button>
                    </Box> : mode === 'url' ?
                    <TextField
                        label='Image URL'
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                        fullWidth
                        sx={{ margin: '12px 0' }}
                    /> : null
                }
                
                <DialogContentText>
                    Fill in only the fields you want to edit!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={editBookMark}>Edit</Button>
            </DialogActions>
        </Dialog>
    )
}
