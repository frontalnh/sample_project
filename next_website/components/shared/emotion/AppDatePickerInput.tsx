import styled from '@emotion/styled';
import { Box, InputBase } from '@mui/material';

const AppDatePickerInput = styled(InputBase)(() => ({
  width: '100%',

  'label + &': {},
  '& .MuiInputBase-input': {
    position: 'relative',
    fontSize: 13,
    borderRadius: '6px',
    padding: '0 20px',
    '&:focus': {},
  },
}));

export default AppDatePickerInput;
