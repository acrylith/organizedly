import { Box, css } from "@mui/material";
import React, { useState } from "react";
import Clock from "./components/clock/Clock";
import DialPanel from "./components/dials/DialPanel";
import Groups from "./components/groups/Groups";

function App() {
  const [group, setGroup] = useState(1)
  const handleGroup = (id) => {
    setGroup(Number(id))
  }
  return (
    <div className="App" >
      <Groups group={group} handle={handleGroup} />
      <Box sx={ScreenWrapper}>
        <Clock />
        <DialPanel group={group} />
      </Box>
    </div>
  );
}

const ScreenWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '2em',
  height: '100vh',
  padding: '10% 0'
})

export default App;
