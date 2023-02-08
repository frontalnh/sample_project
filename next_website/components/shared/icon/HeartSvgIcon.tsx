import { createSvgIcon } from '@mui/material';

const HeartSvgIcon = createSvgIcon(
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M16 5C14.2667 5 12.56 6.16667 12 7.77778C11.44 6.16667 9.73333 5 8 5C6.93913 5 5.92172 5.43899 5.17157 6.22039C4.42143 7.00179 4 8.0616 4 9.16667C4 12.7778 6.93333 16.3889 12 20C17.0667 16.3889 20 12.7778 20 9.16667C20 8.0616 19.5786 7.00179 18.8284 6.22039C18.0783 5.43899 17.0609 5 16 5V5Z'
      stroke='#7A7A7A'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>,
  'HeartSvgIcon',
);

export const RedHeartSvgIcon = createSvgIcon(
  <svg width='24' height='24' viewBox='0 0 24 24' fill='#ff4d4d' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M16 5C14.2667 5 12.56 6.16667 12 7.77778C11.44 6.16667 9.73333 5 8 5C6.93913 5 5.92172 5.43899 5.17157 6.22039C4.42143 7.00179 4 8.0616 4 9.16667C4 12.7778 6.93333 16.3889 12 20C17.0667 16.3889 20 12.7778 20 9.16667C20 8.0616 19.5786 7.00179 18.8284 6.22039C18.0783 5.43899 17.0609 5 16 5V5Z'
      stroke='#ff4d4d'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>,
  'HeartSvgIcon',
);

export default HeartSvgIcon;
