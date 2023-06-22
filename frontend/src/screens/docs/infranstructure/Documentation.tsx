import React from 'react'
import { Box } from '@mui/system'
import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'
export default function Documentation (): JSX.Element {
  return (
    <Box sx={{ p: 2 }}>
      <Header />
      <Outlet/>
    </Box>
  )
}
