import React from 'react';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';

export default function CustomNotification({ title, content, type = 'success' }) {
  const types = {
    success: {
      backgroundColor: '#CDFFF7',
      color: '#4FDFC8',
    },
    danger: {
      backgroundColor: '#FFEDED',
      color: '#FF4D4D',
    },
    default: {
      backgroundColor: '#D1E3F5',
      color: '#4C647A',
    },
  };
  return (
    <div
      style={{
        //  backgroundColor: types[type].backgroundColor,
        borderColor: types.default.backgroundColor,
        marginBottom: '1rem',
      }}
      className="rounded-8 p-16 text-16 border flex flex-wrap flex-row gap-6 items-center"
    >
      <div
        style={{
          borderRadius: '12px',
          backgroundColor: types[type].backgroundColor,
          padding: '12px',
        }}
      >
        {type === 'success' ? (
          <CheckCircleIcon sx={{ color: '#4FDFC8' }} />
        ) : (
          <DoNotDisturbOnIcon sx={{ color: '#FF4D4D' }} />
        )}
      </div>
      <div>
        {title && <Typography style={{ color: types.default.color }}>{title}</Typography>}
        {content && <div style={{ color: types.default.color  }}>{content}</div>}
      </div>
    </div>
  );
}
