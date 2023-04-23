import { Box } from '@mui/material'
import React from 'react'
import ProgressTracking from '../components/common/ProgressTracking'
import HistoryTracking from '../components/common/HistoryTracking'
import DetailTracking from '../components/common/DetailTracking'
import ChartTracking from '../components/common/ChartTracking'

const HomePage = () => {

  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='flex-start'
      sx={{
        width: '100vw',
        height: '100vh',
      }}>
      <Box sx={{
        height:'100vh',
        width:'50%',
      }}>
        <ProgressTracking/>
        <HistoryTracking/>
      </Box>
      <Box sx={{
        height:'100vh',
        width:'50%',
      }}>
        <DetailTracking/>
        <ChartTracking/>
      </Box>
    </Box>
  )
}

export default HomePage