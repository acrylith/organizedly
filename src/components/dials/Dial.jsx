import { IconButton, Link, ListItemIcon, Menu, MenuItem, Paper, Typography } from '@mui/material'
import { css } from '@mui/system'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useState } from 'react'
import { idb } from '../../idb'
import EditModal from './EditModal';

export default function Dial(props) {
    const { url, title, img, id } = props.dial
    const [anchorEl, setAnchorEl] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const isContext = Boolean(anchorEl)
    const handleOpenContext = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleCloseContext = () => {
        setAnchorEl(null)
    }
    const handleOpenEdit = () => {
        handleCloseContext()
        setIsEdit(true)
    }
    const handleCloseEdit = () => {
        setIsEdit(false)
    }

    async function deleteBookmark() {
        try {
            await idb.bookmarks.delete(id)
        } catch(error) {
            alert(error)
        }
    }
    return (
        <Paper variant='outlined' sx={DialBg}>
            <IconButton sx={MoreButton} onClick={handleOpenContext}>
                <MoreVertIcon />
            </IconButton>
            <Link href={`http://${url}`} sx={DialLink}>
                {img ?
                    <img src={URL.createObjectURL(img)} alt={title} /> :
                    <Typography component='span'>{title}</Typography>
                }
            </Link>
            <Menu anchorEl={anchorEl} open={isContext} onClose={handleCloseContext}>
                <MenuItem onClick={handleOpenEdit}>
                    <ListItemIcon><EditIcon/></ListItemIcon> Edit
                </MenuItem>
                <MenuItem onClick={deleteBookmark}>
                    <ListItemIcon><DeleteIcon/></ListItemIcon> Delete
                </MenuItem>
            </Menu>
            <EditModal dial={props.dial} open={isEdit} onClose={handleCloseEdit} /> 
        </Paper>
    )
}

const DialBg = css({
    height: '120px',
    borderRadius: '14px',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'rgba(61, 61, 61, 0.3)',
    transition: 'all .4s',
    '&:hover': {
        borderColor: 'white',
        backgroundColor: 'rgba(61, 61, 61, 0.7)',
        cursor: 'pointer',
        '& button': {
            opacity: 0.5
        }
    }
})
const DialLink = css({
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    textDecoration: 'none',
    '& img': {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    '& span': {
        fontWeight: 500,
        color: 'white'
    }
})
const MoreButton = css({
    position: 'absolute',
    top: 0,
    right: 0,
    opacity: 0,
    transition: '.4s',
    '&:hover': {
        opacity: '1 !important'
    }
})