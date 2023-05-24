import React from 'react';
import './styles.css';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { CustomList } from './Components/CustomList';

export default function App() {
  return (
    <>
      <AppBar
        position='fixed'
        style={{
          backgroundColor: 'blue',
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap>
            My List Of Stuff
          </Typography>
        </Toolbar>
      </AppBar>
      <CustomList />
    </>
  );
}
