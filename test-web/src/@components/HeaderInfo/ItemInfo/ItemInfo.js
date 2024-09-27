import { Typography } from '@mui/material';

export default function ItemInfo({ label, value, align, index }) {
  return (
    <div className={`lg:${align}`}>
      <Typography
        style={{
          color: '#7F9BB4',
        }}
        className="text-xs font-semibold"
      >
        {label}
      </Typography>
      <Typography
        style={{
          color: '#023E73',
        }}
        className="text-base font-semibold"
      >
        {value}
      </Typography>
    </div>
  );
}
