import styled from '@emotion/styled';
import { Box, InputBaseProps, TextareaAutosize } from '@mui/material';
import { AppColors } from '@theme/schemes/AppPersonalColor';
import React, { CSSProperties } from 'react';

interface CommonTextAreaProps {
  wrapperStyle?: CSSProperties;
  error?: boolean;
  limit?: number;
}

export default function CommonTextArea({ wrapperStyle, error, limit, ...rest }: CommonTextAreaProps & InputBaseProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* @ts-ignore */}
      <TextareaAutosizeStyle
        style={wrapperStyle}
        placeholder={rest.placeholder}
        onChange={rest.onChange}
        name={rest.name}
        maxLength={limit}
        error={error}
        {...rest}
      />
    </Box>
  );
}
const TextareaAutosizeStyle = styled(TextareaAutosize)<{ error?: boolean }>`
  border: ${(props) => (props.error ? `1px solid ${AppColors.error}` : `1px solid ${AppColors.black4}`)};
  resize: none;
  outline: none;
  margin: 0;
  padding: 12px 16px;
  font-size: 13px;
  background-color: ${AppColors.white};
  border: 1px solid ${AppColors.black4};
  color: #000000;
  font-family: 'Noto Sans KR', sans-serif;
  &::placeholder {
    font-size: 13px;
    color: ${AppColors.black40};
    font-family: 'Noto Sans KR', sans-serif;
    opacity: 100%;
  }
  &:focus {
    border: 1px solid ${AppColors.black72};
  }

  textarea {
  }
`;
