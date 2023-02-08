import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/material';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

export const QuillNoSSRWrapper = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const modules = {
  toolbar: [
    [
      { header: '1' },
      { header: '2' },
      // { font: [] }
    ],
    [{ size: [] }],
    [
      'bold',
      'italic',
      'underline',
      // 'strike',
      // 'blockquote'
    ],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      // { indent: '-1' },
      // { indent: '+1' },
    ],
    ['link', 'image', 'video'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

interface Props {
  height?: string;
}

export default function QuillEditor({ height, ...rest }: Props & BoxProps) {
  return (
    <Box sx={{ pb: '66px' }} {...rest}>
      <CustomReactQuill theme='snow' formats={formats} modules={modules} height={height} />
    </Box>
  );
}

const CustomReactQuill = styled(QuillNoSSRWrapper)<{ height: string | undefined }>`
  width: 100%;
  .ql-container {
    width: 100%;
    height: ${(props) => (props.height ? `calc(${props.height} - 40px)` : '450px')};
  }

  @media (max-width: 560px) {
    height: ${(props) => (props.height ? `calc(${props.height} - 66px)` : '450px')};
  }
`;
