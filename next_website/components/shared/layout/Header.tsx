import { Box, BoxProps } from '@mui/material';

export default function HeaderLayout({ children, sx, ...rest }: BoxProps) {
  return (
    <Box component={'header'} sx={{ ...sx }} {...rest}>
      {children}
    </Box>
  );
}
