import { Box, BoxProps } from '@mui/material';

export default function Time({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component='time' sx={{ ...sx }} {...rest}>
      {children}
    </Box>
  );
}
