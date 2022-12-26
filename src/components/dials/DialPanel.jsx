import { useLiveQuery } from 'dexie-react-hooks';
import React, { useState } from 'react';
import { css } from '@mui/system';
import { Box, Container, Paper, Typography } from '@mui/material';
import { idb } from '../../idb';
import AddModal from './AddModal';
import Dial from './Dial';

export default function DialPanel(props) {
    const [addOpen, setAddOpen] = useState(false)
    const addOpenHandle = () => {
        setAddOpen(!addOpen)
    }
    const list = useLiveQuery(
        () => idb.bookmarks
        .where('groupID')
        .equals(props.group)
        .toArray(),
        [props.group]
    )
    return (
        <>
            <Container>
                <Box sx={GridList}>
                    {list?.map(dial => <Dial key={dial.id} dial={dial} />)}
                    <Paper variant='outlined' sx={AddPane} onClick={addOpenHandle}>
                        <Typography component='span' sx={{ fontWeight: 500, fontSize: 72 }}>+</Typography>
                    </Paper>
                </Box>
            </Container>
            <AddModal setIsOpen={addOpenHandle} group={props.group} open={addOpen} />
        </>
    )
}

const GridList = css({
    position: 'relative',
    display: 'grid',
    gap: '1em',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    maxHeight: 'calc(240px + 1em)',
    overflow: 'auto',
    '::-webkit-scrollbar': {
        width: '6px'
    },
    '::-webkit-scrollbar-track': {
        backgroundColor: 'transparent'
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(140, 140, 140, 0.3)',
        borderRadius: '14px',
        transition: 'all .4s',
        '&:hover': {
            backgroundColor: 'rgba(140, 140, 140, 1)'
        }
    }
})
const AddPane = css({
    height: '120px',
    borderRadius: '14px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(61, 61, 61, 0.3)',
    transition: 'all .4s',
    '&:hover': {
        borderColor: 'white',
        backgroundColor: 'rgba(61, 61, 61, 0.7)',
        cursor: 'pointer',
    }
})