import { Box, BoxProps } from '@mui/material';

export default function Footer({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component='footer' sx={{ ...sx }} {...rest}>
      {children}
    </Box>
  );
}
