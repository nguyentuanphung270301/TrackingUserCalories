import { Box } from '@mui/material'
import React from 'react'
import TrackingLeft from '../components/common/TrackingLeft'
import TrackingRight from '../components/common/TrackingRight'

const TrackingPage = () => {
  return (
    <Box
      display='flex'
    >
      <Box
        width='1000px'
        height='743px'
        sx={{
          backgroundColor: '#f9f9f9',
          marginRight: '5px'
        }}
      >
        <TrackingLeft />
      </Box>
      <Box
        width='470px'
        height='743px'
        sx={{
          backgroundColor: 'white'
        }}
      >
        <TrackingRight />
      </Box>
    </Box>
  )
}

export default TrackingPage