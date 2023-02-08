import React from 'react';
import { SxProps, Typography, TypographyProps } from '@mui/material';
// import { ReactNode } from 'react';

interface DefaultTypoTextProps {
  // children: ReactNode | string;
  // sx?: SxProps; 여기 빌드 엄청 오래 걸리는 문제를 야기한다.
}

export default function DefaultTypoText({ children, sx, ...rest }: DefaultTypoTextProps & TypographyProps) {
  return (
    <Typography
      sx={{
        display: 'flex ',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Noto Sans KR , sans-serif',
        ...sx,
      }}
      {...rest}>
      {children}
    </Typography>
  );
}
