import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { format } from 'date-fns';

const useStyles = makeStyles(() => ({
  infoContainer: {
    marginTop: 12,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 8,
    border: '1px solid #D1E3F5',
    padding: 16,
  },
}));

const HeaderRadicado = (props) => {
  const { data } = props;
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.infoContainer,
        'flex flex-col md:flex-row justify-between md:items-center'
      )}
      {...props}
    >
      <div className="flex flex-col">
        <p className="text-18 font-bold text-primary"> Trámite: </p>
        <p className="text-16 font-bold mb-12" style={{ color: '#2E7EC5' }}>
          {data && data.tramite}
        </p>
        <p className="text-14 font-bold text-primary">Fecha Solicitud:</p>
        <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
          {data && data.fecha && (
            <>
              {`${format(new Date(data.fecha), 'yyyy-MM-dd')}`}{' '}
              {format(new Date(data.fecha), '(hh:mm a)')}
            </>
          )}
        </p>
      </div>
      { data.costo_proyecto && data.profesionales_asg  && (
          <div className="flex flex-col items-start ">
            <p className="text-14 font-bold text-primary">Número de profesionales asignados:</p>
            <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
              {data.profesionales_asg}
            </p>
            <p className="text-14 font-bold text-primary">Costo total proyecto :</p>
            <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
              ${data.costo_proyecto}
            </p>
          </div>
        )}
      <div className="flex flex-col items-start md:items-end">
        <p className="text-18 font-bold text-primary">Radicado #</p>
        <p className="text-16 font-bold mb-12" style={{ color: '#2E7EC5' }}>
          {data && data.radicado}
        </p>
        <p className="text-14 font-bold text-primary">Solicitante :</p>
        <p className="text-14 font-bold mb-12" style={{ color: '#2E7EC5' }}>
          {data && data.nombre} {data && data.apellido} - C.C. {data && data.documento}
        </p>
      </div>
    </div>
  );
};

export default HeaderRadicado;
