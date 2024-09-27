import { DocumentIcon } from '@components/FuseSvgIcon';
import { Typography, IconButton, TextField } from '@mui/material';
import { format } from 'date-fns';

const ViewProrroga = ({ title, body, dataProrroga, value, handleChange, downloadFile }) => {
  return (
    <div className="flex flex-col mb-10">
      <Typography className="text-primary mb-5">
        <span className="font-bold" style={{ color: '#145C9C' }}>
          {title}:
        </span>
      </Typography>

      {title === 'Fecha Solicitud' && (
        <Typography className="text-primary">
          {`${format(new Date(body), 'yyyy-MM-dd')}`} {format(new Date(body), '(hh:mm a)')}
        </Typography>
      )}
      {title === 'Dias calendario de prórroga solicitados' && (
        <div
          className="flex justify-between p-10 border-dashed border-1 rounded-12 items-center"
          style={{ backgroundColor: '#FFF6D6', borderColor: '#FCC500' }}
        >
          <div className="flex items-center gap-4">
            <TextField
              onChange={handleChange}
              size="small"
              style={{ width: '50px', fontWeight: 'bold' }}
              value={value}
            />
            <Typography className="text-primary font-bold"> dias</Typography>
          </div>
          <Typography
            style={{
              color: `${
                dataProrroga?.aprobado === 0
                  ? '#00274A'
                  : dataProrroga?.aprobado === 1
                  ? '#CD6155'
                  : '#3ABDA8'
              }`,
            }}
            className="font-bold"
          >
            {dataProrroga?.aprobado === 0
              ? 'Revisión'
              : dataProrroga?.aprobado === 1
              ? 'Denegado'
              : 'Aprobado'}
          </Typography>
        </div>
      )}
      {title === 'Documentos adjuntos' && (
        <div>
          {dataProrroga?.comprobante_s3_url?.map((doc, index) => (
            <IconButton
              key={index}
              style={{
                background: '#D6EAF8',
                borderBottom: 'none',
                marginRight: `${index === 0 ? '10px' : '0'}`,
              }}
              onClick={() => downloadFile(doc)}
            >
              <DocumentIcon fill="#00274A" height="25" width="25" />
            </IconButton>
          ))}
        </div>
      )}
      {title === 'Justificación prórroga' && (
        <div className="h-64 overflow-y-scroll">
          <Typography className="text-primary ">{body}</Typography>
        </div>
      )}
    </div>
  );
};

export default ViewProrroga;
