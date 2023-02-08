import { Box } from '@mui/material';
import { BoxProps } from '@mui/system';

export default function Address({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component='address' sx={{ fontStyle: 'unset', ...sx }} {...rest}>
      {children}
    </Box>
  );
}
