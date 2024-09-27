import { Typography } from '@mui/material';

export default function CustomBoxTable({ title, children, styleHeader, styleTitle }) {
  return (
    <div className="rounded-8  flex flex-col">
      <div
        style={styleHeader || { backgroundColor: '#F5FBFF', borderColor: '#D1E3F5' }}
        className="border rounded-t-lg px-16 py-8 text-16"
      >
        <Typography
          style={
            styleTitle || {
              color: '#4C647A',
            }
          }
          className="font-semibold text-base"
        >
          {title}
        </Typography>
      </div>
      <div
        style={{
          borderColor: '#D1E3F5',
        }}
        className=" border-t-0 border rounded-b-lg px-16 py-8 text-16"
      >
        {children}
      </div>
    </div>
  );
}
