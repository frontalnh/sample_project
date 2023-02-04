import { alpha, Button, ButtonProps, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CircularProgress, { circularProgressClasses, CircularProgressProps } from '@mui/material/CircularProgress';

interface BaseButtonProps {
  label: string;
  labelColor?: string;
  buttonColor?: string;
  component?: string;
  onClick?: () => void;
  preventDoubleClick?: boolean;
  labelStyle?: SxProps;
  wrapperStyle?: SxProps;
  disabledStyle?: SxProps;
  hoverStyle?: SxProps;
}

const BaseButton = ({
  label,
  labelColor = '#ffffff',
  buttonColor = '#000000',
  wrapperStyle,
  onClick,
  preventDoubleClick,
  labelStyle,
  disabledStyle,
  hoverStyle,
  ...rest
}: BaseButtonProps & ButtonProps) => {
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);

  const preventOnClick = () => {
    if (!spinner && preventDoubleClick) {
      setSpinner(true);
      onClick && onClick();
    }
  };

  const directOnClick = () => {
    setSpinner(false);
    onClick && onClick();
  };

  useEffect(() => {
    setSpinner(false);
  }, [router]);

  return (
    <Button
      onClick={preventDoubleClick ? preventOnClick : directOnClick}
      //@ts-ignore
      sx={{
        width: '310px',
        height: '50px',
        color: labelColor,
        backgroundColor: buttonColor,
        borderRadius: '12px',
        transition: 'all 100ms ease-in-out',
        '&:hover': {
          transition: 'all 100ms ease-in-out',
          backgroundColor: '#4d4d4d',
          ...hoverStyle,
        },
        '&.Mui-disabled': {
          color: '#ffffff',
          backgroundColor: '#c7c7c7',
          ...disabledStyle,
        },
        ...wrapperStyle,
      }}
      {...rest}>
      {rest.children && rest.children}
      {spinner ? (
        <Spinner />
      ) : (
        <Typography sx={{ fontSize: '14px', fontWeight: 'bold', ...labelStyle }}>{label}</Typography>
      )}
    </Button>
  );
};

export default BaseButton;

// Inspired by the former Facebook spinners.
function Spinner(props: CircularProgressProps) {
  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        }}
        size={25}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: '#004ee2',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={25}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
