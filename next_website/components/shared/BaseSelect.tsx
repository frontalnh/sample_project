import React, { useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OutlinedInput } from '@mui/material';

interface AppSelectProps {
  options: { label: string, value: any }[],
  onChangeValue: (value: any) => void
}

const fontSize = 12
const menuStyle = { fontSize, height: 40 }

export default function BaseSelect(props: AppSelectProps) {
  const { options, onChangeValue } = props
  const [value, setValue] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    onChangeValue(value)
  }, [value])

  return (
    <FormControl sx={{ m: 1, minWidth: 88, WebkitTapHighlightColor: 'transparent' }} size="small">
      <Select
        style={{
          backgroundColor: '#F4F4F4', fontSize: fontSize,
          WebkitTapHighlightColor: 'transparent'
        }}
        inputProps={{ 'aria-label': 'Without label' }}
        labelId="demo-select-small"
        id="demo-select-small"
        input={<OutlinedInput style={{ WebkitTapHighlightColor: 'transparent' }} />}
        value={value}
        onChange={handleChange}
        displayEmpty
      >
        <MenuItem
          style={menuStyle}
          value="">
          <em>선택</em>
        </MenuItem>
        {options.map((option, i) => {
          return <MenuItem
            key={i} style={menuStyle}
            value={option.value}>{option.label}</MenuItem>
        })}
      </Select>
    </FormControl>
  );
}