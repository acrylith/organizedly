import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, DialogContentText } from '@mui/material'
import React, { useState } from 'react'
import { idb } from '../../idb'

export default function EditModal(props) {
    const { dial } = props
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [img, setImg] = useState('')

    async function editBookMark() {
        try {
            const id = await idb.bookmarks.update(dial.id, {
                ...(title !== '') && {title: title},
                ...(url !== '') && {url: url}, 
                ...(img !== '') && {
                    img: await fetch(img, {crossorigin: true}).then(function(response){
                        return response.blob()
                    })
                }
            })
            alert(`Bookmark ${title} Updated. Got code ${id}`)
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
                <TextField
                    label='Image URL'
                    value={img}
                    onChange={(e) => setImg(e.target.value)}
                    fullWidth
                    sx={{ margin: '12px 0' }}
                />
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
