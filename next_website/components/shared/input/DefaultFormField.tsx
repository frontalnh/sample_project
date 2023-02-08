import { AppColors } from '@theme/schemes/AppPersonalColor';
import styled from '@emotion/styled';
import { Box, InputBaseProps, SxProps, Typography } from '@mui/material';
import React, { CSSProperties } from 'react';
import CommonLabel from '../atoms/CommonLabel';
import CommonTextInput from '../atoms/CommonTextInput';
import CommonTextArea from '../atoms/CommonTextArea';
import ErrorSvgIcon from '../icon/ErrorSvgIcon';
import AppErrorText from '../emotion/AppErrorText';

interface DefaultFormFieldProps {
  label?: string;
  labelColor?: string;
  labelStyle?: SxProps;
  wrapperStyle?: SxProps;
  helperText?: string | false;
  containerStyle?: SxProps;
  limit?: number;
  limitValue?: number;
  required?: boolean;
  hover?: string;
  exampleText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  timeCount?: number;
  setTimeCount?: React.Dispatch<React.SetStateAction<number>>;
  error?: boolean;
  textArea?: boolean;
  search?: boolean;
}

export default function DefaultFormField({
  label,
  labelStyle,
  helperText,
  wrapperStyle,
  containerStyle,
  limit,
  limitValue,
  required,
  hover,
  exampleText,
  error,
  leftIcon,
  rightIcon,
  timeCount,
  setTimeCount,
  textArea,
  search,
  ...rest
}: DefaultFormFieldProps & InputBaseProps) {
  return (
    <Box sx={{ ...containerStyle }}>
      {label && <CommonLabel label={label} labelStyle={labelStyle} required={required} {...rest} />}

      <Box sx={{ width: '100%', position: 'relative' }}>
        {textArea ? (
          <CommonTextArea wrapperStyle={wrapperStyle as CSSProperties} error={error} limit={limit} {...rest} />
        ) : (
          <CommonTextInput
            wrapperStyle={wrapperStyle}
            error={error}
            timeCount={timeCount}
            setTimeCount={setTimeCount}
            limit={limit}
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            search={search}
            {...rest}
          />
        )}
        {exampleText && !error && <ExampleText>{exampleText}</ExampleText>}
        {error ? (
          <Box
            sx={{
              position: 'absolute',
              bottom: textArea ? '-14px' : '-20px',
              left: '8px',
              display: 'flex',
              height: '16px',
              justifyContent: 'start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <ErrorSvgIcon sx={{ width: 16, height: 16 }} viewBox='0 0 16 16' />
            <AppErrorText>{helperText}</AppErrorText>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

const ExampleText = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  margin-top: 4px;
  opacity: 0.3;
`;

const ErrorText = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  color: ${AppColors.error};
`;
