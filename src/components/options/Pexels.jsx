import { CircularProgress, ImageList, ImageListItem, Link, Typography, css } from "@mui/material";
import { Box } from "@mui/system";
import { useMutation, useQuery } from "@tanstack/react-query";
import { idb } from "../../idb";
import { pexelClient } from "../../pexel"
import { fileToDataUri } from "../../utils";

export default function Pexels(props) {
    const { searchQuery = '' } = props
    const { status: pexelStatus, error: pexelError, data: pexelData } = useQuery({
        queryKey: ["bgImages"],
        queryFn: async () => {
            const data = pexelClient.photos.search({ query: searchQuery, per_page: 40, orientation: 'landscape' })
            return data
        },
        enabled: searchQuery !== '' ? true : false
    })
    const changeBg = useMutation(
        async (data) => {
            const response = await fetch(`https://api.codetabs.com/v1/proxy?quest=${data.link}`)
            const blob = await response.blob()
            const base64 = await fileToDataUri(blob)
            await idb.settings.put({
                name: 'bg',
                base64: base64,
                photographer: data.photographer,
                photographer_url: data.photographer_url
            })
        }
    );
    return (
        <>
            <Typography sx={{ textAlign: 'center', my: 1 }}>Powered by <Link href="https://www.pexels.com">Pexels</Link></Typography>
            <Box sx={{ position: 'relative' }}>
                {
                    pexelStatus === 'loading' && searchQuery === '' ? null :
                    pexelStatus === 'loading' ?
                    (<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>):
                    pexelStatus === 'error' ?
                    (<Typography>{pexelError.message}</Typography>):
                    pexelStatus === 'success' ?
                    (
                        <ImageList variant="masonry" cols={3} gap={4} sx={{ my: 0 }}>
                            {pexelData.photos?.map(img => 
                                <ImageListItem
                                    sx={pexelImage}
                                    key={img.id}
                                    onClick={() => {
                                        changeBg.mutate({
                                            link: img.src.landscape,
                                            photographer: img.photographer,
                                            photographer_url: img.photographer_url
                                        })
                                    }}
                                >
                                    <img src={img.src.large} alt={img.alt} loading="lazy" />
                                </ImageListItem>
                            )}
                        </ImageList>
                    ) : null
                }
                {
                    changeBg.status === 'loading' ?
                    <Box sx={loadingLock}>
                        <CircularProgress />
                    </Box>: null
                }
            </Box>
        </>
    )
}

const loadingLock = css({
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    padding: '2em 0'
})

const pexelImage = css`
    img {
        transition: all .3s;
        &:hover {
            cursor: pointer;
            filter: brightness(120%);
        }
    }
`