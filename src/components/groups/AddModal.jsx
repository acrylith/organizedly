import React, { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { idb } from '../../idb'

export default function AddModal(props) {
    const [title, setTitle] = useState('')
    async function addGroup() {
        try {
            await idb.groups.put({
                title: title
            })
            setTitle('')
            props.setIsOpen()
        } catch (error) {
            alert(error)
        }
    }
    return (
        <Dialog onClose={props.setIsOpen} open={props.open}>
            <DialogTitle>Add Bookmark</DialogTitle>
            <DialogContent>
            <TextField
                label='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                sx={{ margin: '12px 0' }}
            />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.setIsOpen}>Cancel</Button>
                <Button onClick={addGroup} disabled={title === '' ? true : false}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}