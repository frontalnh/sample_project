import styled from '@emotion/styled';
import { Box, BoxProps } from '@mui/material';
import dynamic from 'next/dynamic';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const QuillNoSSRWrapper = dynamic(async () => {
  const { default: RQ } = await import("react-quill");
  return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
}, {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
// toolbar에 사용되는 tool format
const formats = [
  'font',
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'formula',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'align',
  'color',
  'background',
];

interface Props {
  height?: string;
  onChange: (value: any) => void;
  imageHandler?: (quillRef: MutableRefObject<ReactQuill>) => void
}



export default function QuillEditor({ height, onChange, imageHandler, ...rest }: Props & BoxProps) {
  const quillRef = useRef<any | typeof ReactQuill>(null);
  const _imageHandler = useCallback(() => {
    if (imageHandler) imageHandler(quillRef)
  }, [imageHandler, quillRef])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [
            'bold',
            'italic',
            'underline',
            // 'strike',
            //  'blockquote',
            // 'code-block',
            // 'formula',
          ],
          [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
          ['link', 'image', 'video'],
          [{ align: [] }, { color: [] }, { background: [] }],
          ['clean'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },

        // custom 핸들러 설정
        handlers: {
          image: _imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    [_imageHandler],
  );

  return (
    <Box {...rest} >
      <CustomReactQuill
        forwardedRef={quillRef}
        theme='snow'
        formats={formats}
        modules={modules}
        height={height}
        // @ts-ignore
        onChange={(value, delta, source, editor) => {
          onChange(value)
        }}
      />
    </Box>
  );
}

const CustomReactQuill = styled(QuillNoSSRWrapper) <{ height: string | undefined; }>`
  width: 100%;

  .ql-container {
    width: 100%;
    height: ${(props) => (props.height ? `calc(${props.height} - 40px)` : '450px')};
  }

  @media (max-width: 560px) {
    height: ${(props) => (props.height ? `calc(${props.height} - 66px)` : '450px')};
  }

  @media (max-width: 340) {
    height: ${(props) => (props.height ? `calc(${props.height} - 90px)` : '450px')};
  }
`;
