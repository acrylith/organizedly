import { Box, Button, Link, Typography, css } from "@mui/material";
import React, { useState } from "react";
import Clock from "./components/clock/Clock";
import DialPanel from "./components/dials/DialPanel";
import Groups from "./components/groups/Groups";
import Weather from "./components/weather/Weather";
import SettingsIcon from '@mui/icons-material/Settings';
import OptionsModal from "./components/options/OptionsModal";
import { useLiveQuery } from "dexie-react-hooks";
import { idb } from "./idb";
import { Global } from "@emotion/react";

const svgBg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='343' height='343' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%2300122B' stroke-width='4.5'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23002E6E'%3E%3Ccircle cx='769' cy='229' r='10'/%3E%3Ccircle cx='539' cy='269' r='10'/%3E%3Ccircle cx='603' cy='493' r='10'/%3E%3Ccircle cx='731' cy='737' r='10'/%3E%3Ccircle cx='520' cy='660' r='10'/%3E%3Ccircle cx='309' cy='538' r='10'/%3E%3Ccircle cx='295' cy='764' r='10'/%3E%3Ccircle cx='40' cy='599' r='10'/%3E%3Ccircle cx='102' cy='382' r='10'/%3E%3Ccircle cx='127' cy='80' r='10'/%3E%3Ccircle cx='370' cy='105' r='10'/%3E%3Ccircle cx='578' cy='42' r='10'/%3E%3Ccircle cx='237' cy='261' r='10'/%3E%3Ccircle cx='390' cy='382' r='10'/%3E%3C/g%3E%3C/svg%3E"

function App() {
  const [group, setGroup] = useState(1)
  const [options, setOptions] = useState(false)
  const handleGroup = (id) => {
    setGroup(Number(id))
  }
  const toggleOptions = () => {
    setOptions(!options)
  }
  const bgImage = useLiveQuery(async () => await idb.settings.where('name').equals('bg').first())
  const isBlured = useLiveQuery(async () =>
    await idb.settings.where('name').equals('blur').first().then(data => data?.isBlured)
  )
  return (
    <>
      <Global styles={[
        globalStyles, {
          'body' : {
            transition: 'backdrop-filter .3s',
            backgroundImage: `url(${bgImage ? bgImage.base64 : svgBg})`,
            ...(isBlured === true) && { backdropFilter: 'blur(4px)' }
          } 
        }
      ]}/>
      <Box className="App" sx={[Scroller]}>
        <Box sx={ScrollSection}>
          <Groups group={group} handle={handleGroup} />
          <Button variant="text" color="inherit" sx={OptionsButton} onClick={toggleOptions}>
            <SettingsIcon sx={{ fontSize: 18 }} />
          </Button>
          <Box sx={StartScreen}>
            <Clock />
            <DialPanel group={group} />
            <Weather />
          </Box>
        </Box>
      </Box>
      {
      bgImage?.photographer ?
      <Typography sx={Credits}>
        Photo by <Link target="_blank" href={bgImage.photographer_url}>{bgImage.photographer}</Link> from <Link target="_blank" href="https://pexels.com">Pexels</Link>
      </Typography> : null
      }
      <OptionsModal open={options} onClose={toggleOptions} />
    </>
  );
}

const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000D1F;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='304' height='304' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23061A36' stroke-width='1.2'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23093555'%3E%3Ccircle cx='769' cy='229' r='7'/%3E%3Ccircle cx='539' cy='269' r='7'/%3E%3Ccircle cx='603' cy='493' r='7'/%3E%3Ccircle cx='731' cy='737' r='7'/%3E%3Ccircle cx='520' cy='660' r='7'/%3E%3Ccircle cx='309' cy='538' r='7'/%3E%3Ccircle cx='295' cy='764' r='7'/%3E%3Ccircle cx='40' cy='599' r='7'/%3E%3Ccircle cx='102' cy='382' r='7'/%3E%3Ccircle cx='127' cy='80' r='7'/%3E%3Ccircle cx='370' cy='105' r='7'/%3E%3Ccircle cx='578' cy='42' r='7'/%3E%3Ccircle cx='237' cy='261' r='7'/%3E%3Ccircle cx='390' cy='382' r='7'/%3E%3C/g%3E%3C/svg%3E");
    color: #e0dfdf;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`

const Scroller = css`
  position: relative;
  height: 100vh;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`

const ScrollSection = css({
  scrollSnapAlign: 'start',
  position: 'relative',
  height: '100%',
})

const StartScreen = css({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '2em',
  padding: '10% 0'
})

const OptionsButton = css`
  position: absolute;
  top: 10px;
  right: 10px;
  min-width: initial;
  width: 32px;
  height: 32px;
  border-radius: 32px;
`
const Credits = css`
  position: absolute;
  bottom: 12px;
  left: 12px;
  cursor: default;
  opacity: 60%;
  font-size: 12px;
`

export default App;
