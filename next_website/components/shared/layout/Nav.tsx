import { Box, BoxProps } from '@mui/material';

export default function Nav({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component={'nav'} sx={{ ...sx }} {...rest}>
      {children}
    </Box>
  );
}
