import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { SxProps } from '@mui/material';

interface AppExpandMoreProps {
  wrapperStyle: SxProps;
}

export const AppExpandMore = (props: AppExpandMoreProps | any) => {
  const { wrapperStyle } = props;
  return (
    <ExpandMoreTwoToneIcon
      {...props}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: `#000000 !important`,
        width: '16px',
        margin: 0,
        mt: '2px',

        padding: 0,
        ...wrapperStyle,
      }}
    />
  );
};
