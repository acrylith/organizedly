import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material'
import { idb } from '../../idb'

export default function AddModal(props) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [img, setImg] = useState('')

    async function addBookMark() {
        try {
            const id = await idb.bookmarks.put({
                title: title,
                url: url,
                img: img !== '' ?
                    await fetch(img, {crossorigin: true}).then(function(response){
                        return response.blob()
                    }) :
                    null,
                groupID: props.group
            })
            alert(`Bookmark ${title} added in ${props.group}. Got id ${id}`)
            setTitle('')
            setUrl('')
            props.setIsOpen()
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
            </DialogContent>
            <DialogActions>
                <Button onClick={props.setIsOpen}>Cancel</Button>
                <Button onClick={addBookMark}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}