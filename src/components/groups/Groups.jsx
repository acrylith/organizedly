import React, { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { idb } from '../../idb'
import AddModal from './AddModal'
import { Chip } from '@mui/material'
import { Stack } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import EditModal from './EditModal'

export default function Groups(props) {
    const [addOpen, setAddOpen] = useState(false)
    const [edit, setEdit] = useState(null)
    const editOpen = Boolean(edit)
    const addHandler = () => {
        setAddOpen(!addOpen)
    }
    const editHandler = (group) => {
        setEdit(group)
    }
    const closeEdit = () => {
        setEdit(null)
    }
    const groups = useLiveQuery(
        () => idb.groups.toArray()
    )
    return (
        <>
            <Stack
                sx={{ position: 'absolute', top: '0', left: '0', width: '100%', px: 4, py: 1 }}
                direction='row'
                spacing={1}
            >
                {groups?.map(group =>
                    <Chip
                        key={group.id}
                        label={group.title}
                        onClick={() => props.handle(group.id)}
                        variant={props.group === group.id ? 'filled' : 'outlined'}
                        onDelete={props.group === group.id ? () => editHandler(group) : null}
                        deleteIcon={<EditIcon />}
                    />
                )}
                <Chip label='+' variant='outlined' onClick={addHandler}/>
            </Stack>
            <AddModal setIsOpen={addHandler} open={addOpen} />
            {editOpen ? <EditModal onClose={closeEdit} open={editOpen} group={edit} /> : null}
        </>
    )
}