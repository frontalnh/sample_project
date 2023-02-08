import styled from '@emotion/styled';
import { InputBase } from '@mui/material';
import { AppColors } from '@theme/schemes/AppPersonalColor';

const AppCustomInput = styled(InputBase)((props: any) => ({
  'label + &': {},
  height: '100%',
  '& .MuiInputBase-input': {
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    height: '100%',
    padding: '0 16px',
    paddingLeft: '12px',
    borderRadius: 6,
    position: 'relative',
    backgroundColor: AppColors.whiteGrey,
    border: 'none',
    fontSize: 13,
    color: AppColors.black,
    '&:focus': {},
  },
}));

export default AppCustomInput;
