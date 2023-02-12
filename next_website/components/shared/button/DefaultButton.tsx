import React, { ReactNode } from 'react';
import { Button, ButtonProps, Typography, SxProps, CircularProgress } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { AppColors } from '@theme/schemes/AppPersonalColor';

interface DefaultButtonProps {
  component?: string;
  label: string;
  onClick?: () => Promise<void> | void;
  labelStyle?: SxProps;
  wrapperStyle?: SxProps;
  disabledStyle?: SxProps;
  hoverStyle?: SxProps;
  loading?: boolean;
  leftIcon?: ReactNode;
  size?: 'small' | 'medium' | 'large';
  colors?: 'primary' | 'secondary' | 'outline';
}

const DefaultButton = ({
  label,
  wrapperStyle,
  onClick,
  labelStyle,
  disabledStyle,
  hoverStyle,
  size,
  leftIcon,
  colors,
  loading = false,
  ...rest
}: DefaultButtonProps & ButtonProps) => {
  const preventOnClick = () => !loading && onClick?.();
  const directOnClick = () => onClick?.();

  const widthSize = useMemo(() => {
    return size === 'large' ? '310px' : size === 'medium' ? '160px' : size === 'small' ? '94px' : '310px';
  }, [size]);

  const heightSize = useMemo(() => {
    return size === 'large' ? '50px' : size === 'medium' ? '40px' : size === 'small' ? '36px' : '50px';
  }, [size]);

  const fontSize = useMemo(() => {
    return size === 'large' ? '14px' : size === 'medium' ? '12px' : size === 'small' ? '12px' : '14px';
  }, [size]);

  const colorStyle = useCallback(
    (style: 'default' | 'hover' | 'disabled', property: 'backgroundColor' | 'color') => {
      // default 속성
      if (style === 'default') {
        if (property === 'backgroundColor') {
          return colors === 'primary'
            ? AppColors.black
            : colors === 'secondary'
              ? AppColors.lightGrey
              : colors === 'outline'
                ? 'transparent'
                : AppColors.black;
        } else {
          return colors === 'primary'
            ? AppColors.white
            : colors === 'secondary'
              ? AppColors.black
              : colors === 'outline'
                ? AppColors.black
                : AppColors.white;
        }
        // hover 속성
      } else if (style === 'hover') {
        if (property === 'backgroundColor') {
          return colors === 'primary'
            ? AppColors.black72
            : colors === 'secondary'
              ? '#EDEDED'
              : colors === 'outline'
                ? AppColors.whiteGrey
                : AppColors.black72;
        } else {
          return colors === 'primary'
            ? AppColors.white
            : colors === 'secondary'
              ? AppColors.black
              : colors === 'outline'
                ? AppColors.black
                : AppColors.white;
        }
        // disabled 속성
      } else if (style === 'disabled') {
        if (property === 'backgroundColor') {
          return colors === 'primary'
            ? AppColors.grey
            : colors === 'secondary'
              ? AppColors.lightGrey
              : colors === 'outline'
                ? AppColors.lightGrey
                : AppColors.grey;
        } else {
          return colors === 'primary'
            ? AppColors.white
            : colors === 'secondary'
              ? AppColors.grey
              : colors === 'outline'
                ? AppColors.grey
                : AppColors.white;
        }
      }
    },
    [colors],
  );

  return (
    <Button
      disableRipple={loading}
      onClick={loading ? preventOnClick : directOnClick}
      //@ts-ignore
      sx={{
        cursor: loading && 'not-allowed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthSize,
        minWidth: 0,
        height: heightSize,
        borderRadius: '6px',
        transition: 'all 100ms ease-in-out',
        fontSize: '13px',

        border: colors === 'outline' && `1px solid ${AppColors.black}`,
        textTransform: 'none',
        padding: 0,
        backgroundColor: colorStyle('default', 'backgroundColor'),
        color: colorStyle('default', 'color'),
        '&:hover': {
          backgroundColor: colorStyle('hover', 'backgroundColor'),
          color: colorStyle('hover', 'color'),
          transition: 'all 100ms ease-in-out',
          ...hoverStyle,
        },
        '&.Mui-disabled': {
          backgroundColor: colorStyle('disabled', 'backgroundColor'),
          color: colorStyle('disabled', 'color'),
          border: colors === 'outline' && `1px solid ${AppColors.black40}`,
          ...disabledStyle,
        },
        ...wrapperStyle,
      }}
      {...rest}>
      {leftIcon && <div style={{
        display: 'flex', flexDirection: 'column', height: '100%',
        justifyContent: 'center'
      }}>
        {leftIcon}
      </div>}
      <Typography
        sx={{
          fontSize: fontSize,
          fontWeight: 400,
          transition: 'all 300ms ease',
          transform: loading ? 'translate(-2px, 0)' : '',
          ...labelStyle,
        }}>
        {label}
      </Typography>
      {rest.children && rest.children}
      {loading && <CircularProgress size={20} />}
    </Button>
  );
};

export default DefaultButton;
