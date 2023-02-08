import { Box, BoxProps } from '@mui/material';

export default function Aside({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component='aside' sx={{ ...sx }} {...rest}>
      {children}
    </Box>
  );
}
