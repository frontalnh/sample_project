import { Box, BoxProps } from '@mui/material';
import PageSEOHead from '../PageSEOHead';

interface SectionLayoutProps {
  title?: string;
  description?: string;
}

export default function Section({
  children,
  sx,
  title = 'PROJECT',
  description,
  ...rest
}: SectionLayoutProps & BoxProps) {
  return (
    <Box component='section' sx={{ ...sx }} {...rest}>
      <PageSEOHead title={title} description={description} ogType={'site'} />
      {children}
    </Box>
  );
}
