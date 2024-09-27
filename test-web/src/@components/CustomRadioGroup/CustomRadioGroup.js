import React from 'react';
import { makeStyles } from '@mui/styles';
import { RadioGroup, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import CustomRadioCheck from '../CustomRadioCheck/CustomRadioCheck';

export default function CustomRadioGroup({
  control,
  name,
  options,
  onChange,
  rules,
  value,
  error,
  label,
  ...props
}) {
  if (control && name && options) {
    return (
      <div className="flex flex-col gap-2">
        <Typography
          variant="subtitle2"
          className="font-bold text-14 mb-16"
          style={{ color: '#4C647A' }}
        >
          {label}
        </Typography>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field }) => (
            <RadioGroup {...field} {...props}>
              {options.map((option, index) => (
                <CustomRadioCheck
                  key={index}
                  text={option.label}
                  value={option.value}
                  disabled={option.disabled}
                />
              ))}
            </RadioGroup>
          )}
        />
        {error && <p className="text-12 text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <RadioGroup {...props}>
        {options.map((option, index) => (
          <CustomRadioCheck
            key={index}
            text={option.text}
            value={option.value}
            disabled={option.disabled}
          />
        ))}
      </RadioGroup>
    </div>
  );
}
