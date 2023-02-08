import { Box, InputBase, SxProps, Typography } from '@mui/material';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { ko } from 'date-fns/locale';
import { forwardRef, ReactNode, useState } from 'react';
import AppErrorText from '../emotion/AppErrorText';
import { AppColors } from '@theme/schemes/AppPersonalColor';
import CommonLabel from '../atoms/CommonLabel';
import { AppExpandMore } from '../icon/AppExpandMore';
import GreyCalenderSvgIcon from '../icon/grey/GreyCalenderSvgIcon';
import ErrorSvgIcon from '../icon/ErrorSvgIcon';

interface DateCustomInputProps {
  error?: boolean;
  helperText?: string | false;
  wrapperStyle?: SxProps;
  onClick?: () => void;
  placeholder?: string;
  value?: string;
}

export const DateCustomInput = forwardRef((props: DateCustomInputProps, _ref: any) => {
  const { error, helperText, wrapperStyle } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <Box
      onClick={props.onClick}
      sx={{ cursor: 'pointer', position: 'relative' }}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: error ? '56%' : '56%',
          left: '24px',
          transform: 'translate(-50% ,-50%)',
          zIndex: 10,
        }}>
        <GreyCalenderSvgIcon sx={{ width: 24, hieght: 24 }} viewBox={'0 0 24 24'} />
      </Box>
      <InputBase
        value={props.value}
        placeholder={props.placeholder}
        sx={{
          width: '100%',
          height: '40px',
          borderRadius: '6px',
          'label + &': {},
          '& .MuiInputBase-input': {
            backgroundColor: AppColors.whiteGrey,
            border: error
              ? `1px solid ${AppColors.error}`
              : isHover
              ? `1px solid ${AppColors.black}`
              : `1px solid ${AppColors.black4}`,
            position: 'relative',
            fontSize: 13,
            padding: '0 20px',
            pl: '44px',
            height: '100%',
            '&:focus': {},
          },
          ...wrapperStyle,
        }}
      />
      <Box sx={{ position: 'absolute', top: error ? '52%' : '52%', right: 0, transform: 'translate(-50% ,-50%)' }}>
        <AppExpandMore onClick={props.onClick} wrapperstyle={{ mr: '8px' }} />
      </Box>
      {error && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '-20px',
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
      )}
    </Box>
  );
});
interface DateSingleInputProps {
  wrapperStyle?: SxProps;
  placeholder?: string;
  error?: boolean;
  helperText?: string | false;
  label?: string;
  labelStyle?: SxProps;
  required?: boolean;
  startAt?: Date;
  datePickerProps?: Partial<ReactDatePickerProps>;
}

export default function DateSingleInput(props: DateSingleInputProps & ReactDatePickerProps) {
  const {
    wrapperStyle,
    placeholder,
    label,
    labelStyle,
    required,
    error,
    helperText,
    startAt,
    datePickerProps,
    ...rest
  } = props;
  const [startDate, setStartDate] = useState(startAt || null);
  const { onChange } = rest;

  return (
    <Box className={'custom-react-datepicker__container'} sx={{ width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        {label && <CommonLabel required={required} label={label} labelStyle={labelStyle} />}
        <DatePicker
          autoComplete='off'
          placeholderText={placeholder ? placeholder : 'placeholder'}
          locale={ko}
          selected={startDate}
          onChange={(date: any, event: any) => {
            setStartDate(date);
            onChange(date, event);
          }}
          showTimeSelect
          timeFormat='HH:mm'
          timeIntervals={1}
          timeCaption='time'
          dateFormat='MM/dd/yyyy, hh:mm'
          {...datePickerProps}
          customInput={<DateCustomInput wrapperStyle={wrapperStyle} error={error} helperText={helperText} {...rest} />}
        />
      </Box>
    </Box>
  );
}
