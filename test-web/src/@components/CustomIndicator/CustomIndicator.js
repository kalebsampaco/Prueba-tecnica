import { Typography, Tooltip } from '@mui/material';
import formatText from 'app/utils/formatTextApi';
export default function CustomIndicator({ indicator, type, textAlign }) {
  const typeStyles = {
    success: {
      backgroundColor: '#CAFFDF',
      color: '#34BB6A',
      width: 'fit-content',
    },
    warning: {
      backgroundColor: '#FFF6D6',
      color: '#FFC700',
      width: 'fit-content',
    },
    danger: {
      backgroundColor: '#FFEDED',
      color: '#FF4D4D',
      width: 'fit-content',
    },
    default: {
      backgroundColor: '#D0E9FF',
      color: '#2E7EC5',
      width: 'fit-content',
    },
  };
  return (
    <Tooltip title={indicator}>
      <div
        style={{ ...typeStyles[type],
          ...indicator?.length > 10 ? { width: 'max-content' } : { width: 'fit-content' },
        }}
        className="flex justify-center items-center  rounded-2xl  min-h-36 py-3 px-5"
      >
        <Typography
          className="font-bold text-14 "
          style={{
            color: typeStyles[type].color,
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            overflow: 'hidden',
            textAlign,
          }}
        >
          {formatText(indicator)}
        </Typography>
      </div>
    </Tooltip>
  );
}

CustomIndicator.defaultProps = {
  type: 'default',
  indicator: '',
  textAlign: 'center',
};
