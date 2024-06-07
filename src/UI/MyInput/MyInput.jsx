import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function MyInput({ nameCategory, setNameCategory }) {
  return (
    <Box noValidate autoComplete="off">
      <TextField
        value={nameCategory}
        onChange={(e) => {
          setNameCategory(e.target.value);
        }}
        // try to remove it and use fullWidth prop
        sx={{ width: '100%' }}
        id="standard-basic"
        label="Name"
        variant="standard"
      />
    </Box>
  );
}

export default MyInput;
