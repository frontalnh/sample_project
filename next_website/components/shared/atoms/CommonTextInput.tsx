import styled from '@emotion/styled';
import { Box, InputBase, InputBaseProps, SxProps } from '@mui/material';
import { AppColors } from '@theme/schemes/AppPersonalColor';
import React from 'react';
import SearchSvgIcon from '../icon/SearchSvgIcon';
import Timer from '../option/Timer';

interface CommonTextInputProps {
  wrapperStyle?: SxProps;
  error?: boolean;
  timeCount?: number;
  setTimeCount?: React.Dispatch<React.SetStateAction<number>>;
  limit?: number;
  search?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function CommonTextInput({
  wrapperStyle,
  error,
  leftIcon,
  rightIcon,
  timeCount,
  setTimeCount,
  limit,
  search,

  ...rest
}: CommonTextInputProps & InputBaseProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'center',
        backgroundColor: rest.disabled ? '#f2f2f2' : AppColors.white,
        border: error ? `1px solid ${AppColors.error}` : `1px solid ${AppColors.black4}`,

        ...wrapperStyle,
      }}>
      {leftIcon ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '8px',
            zIndex: 5,
            transform: 'translate(0, -50%)',
            minWidth: 24,
            height: 24,
          }}>
          {/* @ts-ignore */}
          <IconBox>{leftIcon}</IconBox>
        </Box>
      ) : search ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '8px',
            zIndex: 5,
            transform: 'translate(0, -50%)',
            width: 24,
            height: 24,
          }}>
          <SearchSvgIcon sx={{ width: 24, height: 24 }} viewBox='0 0 24 24' />
        </Box>
      ) : null}
      <InputBase
        onWheel={(event) => {
          const target = event.target as HTMLElement;
          target.blur();
        }}
        onScroll={(event) => {
          const target = event.target as HTMLElement;
          target.blur();
        }}
        sx={{
          width: '100%',
          height: '100%',
          lineHeight: 1.85,
          fontSize: 13,
          borderRadius: '6px',
          backgroundColor: rest.disabled ? '#f2f2f2' : AppColors.white,
          border: `1px solid ${AppColors.black4}`,
          padding: 0,
          input: {
            borderRadius: '6px',
            width: '100%',
            height: '100%',
            padding: leftIcon ? '0 0 0 55px' : search ? '0 0 0 36px' : '0 16px 0 16px',
            color: AppColors.black,
            '&::placeholder': {
              fontSize: 13,
              opacity: 1,
              color: AppColors.black40,
            },
            '&:focus': {
              border: error ? 'none' : `1px solid ${AppColors.black72}`,
            },
          },
        }}
        inputProps={{
          maxLength: limit,
        }}
        {...rest}
      />
      {rightIcon && (
        <IconBox
          sx={{
            position: 'absolute',
            top: '50%',
            right: '16px',
            zIndex: 5,
            transform: 'translate(0, -50%)',
            width: 24,
            height: 24,
          }}>
          {/* @ts-ignore */}
          {rightIcon}
        </IconBox>
      )}
      {timeCount && setTimeCount && (
        <Box
          sx={{
            position: 'absolute',
            top: '55%',
            right: '24px',
            zIndex: 5,
            transform: 'translate(0, -50%)',
            width: 24,
            height: 24,
          }}>
          <Timer time={timeCount} setTime={setTimeCount} />
        </Box>
      )}
    </Box>
  );
}
const IconBox = styled(Box)`
  min-width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
