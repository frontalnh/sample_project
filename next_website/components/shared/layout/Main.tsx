import { Box, BoxProps } from '@mui/material';

export default function Main({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component='main' sx={{ ...sx }} {...rest}>
      {children}
    </Box>
  );
}
