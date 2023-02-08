import { IconButton, IconButtonProps, Typography, SxProps } from '@mui/material';
import React from 'react';
import { visuallyHidden } from '@mui/utils';
import HiddenTypo from '../option/HiddenTypo';

interface DefaultIconButtonProps {
  text: string;
  typoStyle?: SxProps;
  hidden?: boolean;
}

export default function DefaultIconButton({
  children,
  text,
  typoStyle,
  hidden,
  ...rest
}: DefaultIconButtonProps & IconButtonProps) {
  return (
    <IconButton disableRipple sx={{ minWidth: 0, padding: 0, ...rest.sx }} {...rest}>
      {children}
      {hidden ? <HiddenTypo>{text}</HiddenTypo> : <Typography sx={{ ...typoStyle }}>{text}</Typography>}
    </IconButton>
  );
}
