import CustomDialog from '@components/CustomDialog';
import { CircularProgress, Typography } from '@mui/material';

const LoadingDialogComponent = (props) => {
  const { open, stepCurrent } = props;

  const info = [
    {
      id: 'Enumeracion',
      text: 'Enviando a numeración',
      src: '/assets/images/dialogs/cargando1.gif',
      alt: 'animation loading general',
    },
    {
      id: 'Direccion general',
      text: 'Enviando a dirección general',
      src: '/assets/images/dialogs/cargando1.gif',
      alt: 'animation loading general',
    },
    {
      id: 'Firma',
      text: 'Firmando y certificando digitalmente el documento',
      src: '/assets/images/dialogs/cargando2.webp',
      alt: 'animation firma digital',
    },
  ];

  // Campo por default en caso de no encontrar algun valor
  const propDefault = {
    id: 'Default',
    text: 'Cargando',
    src: '/assets/images/dialogs/cargando1.gif',
    alt: 'animation loading general',
  };

  const findStepCurrent = info.find((item) => item.id === stepCurrent);

  return (
    <div>
      <CustomDialog
        open={open}
        contentText={
          <div style={{ width: 500 }}>
            <div className="flex flex-col items-center justify-center">
              <img
                width={400}
                src={findStepCurrent.src || propDefault.src}
                alt={findStepCurrent.alt || propDefault.alt}
              />
              <Typography
                className="font-bold text-18 "
                style={{ color: '#4C647A', marginLeft: 30 }}
              >
                {findStepCurrent.text || propDefault.text}
              </Typography>
              <CircularProgress color="success" size={42} className="mt-16 mb-32" />
            </div>
          </div>
        }
      />
    </div>
  );
};

export default LoadingDialogComponent;
