import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { idb } from '../../idb';

    export default function EditModal(props) {
        const { group = {title: 'blank', id: 0} } = props
        const [title, setTitle] = useState(group.title)
        async function deleteGroup() {
            await idb.bookmarks
                .where('groupID')
                .equals(group.id)
                .delete()
            await idb.groups
                .where('id')
                .equals(group.id)
                .delete()
            props.onClose()
        }
    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>Edit Group</DialogTitle>
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
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={deleteGroup}>Delete</Button>
                <Button>Edit</Button>
            </DialogActions>
        </Dialog>
    )
}
