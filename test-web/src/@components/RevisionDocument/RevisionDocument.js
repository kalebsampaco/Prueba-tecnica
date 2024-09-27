import CustomButton from '@components/CustomButton';
import CustomContainer from '@components/CustomContainer';
import { DocumentIcon, Warning } from '@components/FuseSvgIcon';
import { Typography } from '@mui/material';

const RevisionDocument = (props) => {
  const {
    fechaCreacion,
    proyeccion,
    tipo,
    estado,
    warningMessage,
    labelButton,
    onClick,
    revision1,
    revision2,
    state,
  } = props;
  return (
    <CustomContainer
      style={{ height: '100%' }}
      content={
        <div>
          <div
            className="flex py-12 px-24 items-center rounded-8"
            style={{
              backgroundColor: '#FFF6D6',
              border: '1px solid #FCC500',
            }}
          >
            <div className="mr-8">
              <Warning fill="#FCC500" />
            </div>
            <div>
              <Typography className="font-bold text-14" style={{ color: '#364A5D' }}>
                {warningMessage}
              </Typography>
            </div>
          </div>
          <div className="mt-16">
            <Typography style={{ color: '#223240' }} className="text-16">
              <span className="font-semibold">Creado: </span> {fechaCreacion}
            </Typography>
            <Typography style={{ color: '#223240' }} className="text-16">
              <span className="font-semibold">Proyectado por: </span> {proyeccion}
            </Typography>
            {revision1 && (
              <Typography style={{ color: '#223240' }} className="text-16">
                <span className="font-semibold">Revisado por: </span> {revision1}
              </Typography>
            )}
            {revision2 !== '' && revision2 !== undefined ? (
              <Typography style={{ color: '#223240' }} className="text-16">
                <span className="font-semibold">Revisado por: </span> {revision2}
              </Typography>
            ) : (
              <div />
            )}
            <Typography style={{ color: '#223240' }} className="text-16">
              <span className="font-semibold">Tipo: </span> {tipo}
            </Typography>
            <Typography style={{ color: '#223240' }} className="text-16">
              <span className="font-semibold">Estado: </span>{' '}
              <span style={{ color: '#3ABDA8' }}>{estado}</span>
            </Typography>
            {state && state !== 3 && (
              <Typography style={{ color: '#223240' }} className="text-16">
                <span style={{ color: '#3ABDA8' }}>{state == 0 ? 'Aceptado' : 'Denegado'}</span>
              </Typography>
            )}
          </div>
          <div className="flex w-full justify-center mx-16">
            <DocumentIcon width={200} fill="#3ABDA8" fontWeight="0.5" />
          </div>
          <div className="my-24">
            <CustomButton
              onClick={onClick}
              className="secondary"
              height="medium"
              label={labelButton}
              width="full"
              style={{ color: '#1A796A', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}
            />
          </div>
        </div>
      }
    />
  );
};

export default RevisionDocument;
