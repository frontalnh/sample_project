import { Box, InputBaseProps, SxProps, Typography } from '@mui/material';
import { AppColors } from '@theme/schemes/AppPersonalColor';

interface CommonLabelProps {
  label: string;
  required?: boolean;
  labelStyle?: SxProps;
}

export default function CommonLabel({ label, required, labelStyle, ...rest }: CommonLabelProps & InputBaseProps) {
  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography
          sx={{
            display: 'inline-flex',
            justifyContent: 'start',
            alignItems: 'center',
            px: '8px',

            fontSize: '12px',
            fontWeight: 'bold',
            pb: '4px',
            color: rest.disabled ? AppColors.black40 : AppColors.black,

            ...labelStyle,
          }}>
          {label}{' '}
          {required && (
            <Typography
              component={'span'}
              sx={{
                pl: '4px',
                lineHeight: 0,
                color: AppColors.error,
                fontFamily: 'Pretendard',
                fontWeight: '600',
              }}>
              *
            </Typography>
          )}
        </Typography>
      </Box>
    </Box>
  );
}
