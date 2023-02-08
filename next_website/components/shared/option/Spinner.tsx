import { Box } from '@mui/material';
import CircularProgress, { circularProgressClasses, CircularProgressProps } from '@mui/material/CircularProgress';
import { AppColors } from '@theme/schemes/AppPersonalColor';

// Inspired by the former Facebook spinners.

interface SpinnerProps {
  insideColor?: string;
  outsideColor?: string;
}

export default function Spinner(props: SpinnerProps & CircularProgressProps) {
  const { insideColor, outsideColor } = props;
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ml: '12px',
        transition: 'all 300ms ease',
      }}>
      <CircularProgress
        variant='determinate'
        sx={{
          color: insideColor ? insideColor : AppColors.black,
          border: 'none',
        }}
        size={20}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: outsideColor ? outsideColor : AppColors.white,
          border: 'none',
          borderRadius: '9999px',
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={20}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
