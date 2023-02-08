import { Box, BoxProps } from '@mui/material';

export default function Article({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component='article' sx={{ ...sx }} {...rest}>
      {children}
    </Box>
  );
}
