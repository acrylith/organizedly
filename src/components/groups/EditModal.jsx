import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { idb } from '../../idb';

    export default function EditModal(props) {
        const { group = {title: 'blank', id: 0} } = props
        const [title, setTitle] = useState('')
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
        async function editGroup() {
            await idb.groups.update(group.id, { title: title })
            props.onClose()
        }
    return (
        <Dialog onClose={props.onClose} open={props.open}>
            <DialogTitle>Edit Group</DialogTitle>
            <DialogContent>
                <TextField
                    label='Enter new title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    sx={{ margin: '12px 0' }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button color='error' onClick={deleteGroup}>Delete</Button>
                <Button onClick={editGroup} disabled={title !== '' ? false : true}>Edit</Button>
            </DialogActions>
        </Dialog>
    )
}
