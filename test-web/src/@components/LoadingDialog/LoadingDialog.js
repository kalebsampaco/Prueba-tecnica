import CustomDialog from '@components/CustomDialog';
import { CircularProgress, Typography } from '@mui/material';
import { useState } from 'react';

const LoadingDialog = (prop) => {
  const { open, close, actoAdministrativo } = prop;

  const [firstThreeSec, setFirstThreeSec] = useState(1);

  const changeDialog = () => {
    if (open) {
      setFirstThreeSec(2);
    }
  };
  setTimeout(changeDialog, 3000);

  return (
    <div>
      <CustomDialog
        open={open}
        close={close()}
        contentText={
          <div style={{ width: 500 }}>
            {firstThreeSec === 1 ? (
              <div className="flex flex-col items-center justify-center">
                <img width={400} src="/assets/images/dialogs/cargando1.gif" alt="confirm" />
                <Typography
                  className="font-bold text-18 "
                  style={{ color: '#4C647A', marginLeft: 30 }}
                >
                  Creando acto administrativo {actoAdministrativo}
                </Typography>
                <CircularProgress color="success" size={42} className="mb-32 mt-16" />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <img width={400} src="/assets/images/dialogs/cargando2.webp" alt="confirm" />
                <Typography
                  className="font-bold text-18 "
                  style={{ color: '#4C647A', marginLeft: 30 }}
                >
                  Firmando y certificando digitalmente el documento
                </Typography>
                <CircularProgress color="success" size={42} className="mb-32 mt-16" />
              </div>
            )}
          </div>
        }
      />
    </div>
  );
};

export default LoadingDialog;
