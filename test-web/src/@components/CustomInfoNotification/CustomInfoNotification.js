import { Typography } from '@mui/material';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function CustomInfoNotification({ text, children, color, type = 'success', icon }) {
  const types = {
    success: {
      backgroundColor: '#CDFFF7',
      color: '#4FDFC8',
    },
    danger: {
      backgroundColor: '#FFEDED',
      color: '#FF4D4D',
    },
  };
  return (
    <div
      style={{
        backgroundColor: types[type].backgroundColor,
        borderColor: types[type].color,
      }}
      className="rounded-8 p-16 text-16 border flex flex-wrap flex-row gap-6 items-center"
    >
      {children || (
        <>
          {icon ||
            (type === 'success' ? (
              <CheckCircleIcon sx={{ color: '#4FDFC8' }} />
            ) : (
              <DoNotDisturbOnIcon sx={{ color: '#FF4D4D' }} />
            ))}
          {text && <Typography style={{ color: types[type].color }}>{text}</Typography>}
        </>
      )}
    </div>
  );
}
