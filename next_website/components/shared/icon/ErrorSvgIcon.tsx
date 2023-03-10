import { createSvgIcon } from '@mui/material';

const ErrorSvgIcon = createSvgIcon(
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='8' cy='8' r='5.5' stroke='#FF7171' />
    <path d='M8 4.5V10M8 11V12' stroke='#FF7171' strokeLinejoin='round' />
  </svg>,
  'ErrorSvgIcon',
);

export default ErrorSvgIcon;
