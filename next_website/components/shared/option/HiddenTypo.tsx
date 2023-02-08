import { Typography, TypographyProps } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

export default function HiddenTypo({ children, ...rest }: TypographyProps) {
  return (
    <Typography sx={visuallyHidden} {...rest}>
      {children}
    </Typography>
  );
}
