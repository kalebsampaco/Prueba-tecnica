import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { Breadcrumbs, IconButton } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const useStyles = makeStyles(() => ({
  headContain: {
    minHeight: 100,
    backgroundColor: '#EEF7FF',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 24,
  },
  indicadorEtapa: {
    border: '1px solid rgba(58, 134, 201, 0.61)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 13,
    borderRadius: 16,
    color: '#2E7EC5',
    fontWeight: 600,
  },
  irAExpediente: {
    border: '3px solid rgba(58, 134, 201, 0.61)',
    backgroundColor: '#F7FEFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 5,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 16,
    color: '#2E7EC5',
    fontWeight: 600,
    textDecoration: 'none',
  },
}));

const CustomHeaderName = (props) => {
  const { backUrl, title, indicadorEtapa, expediente } = props;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.headContain}>
      <div className="flex w-full mx-10  justify-between">
        <div className="flex">
          <IconButton
            style={{ backgroundColor: '#023E73', height: 24, width: 24 }}
            onClick={() => {
              history.push(backUrl);
            }}
          >
            <ArrowBackIosRoundedIcon style={{ color: '#4FDFC8', fontSize: 15 }} />
          </IconButton>
          <div className="flex ml-12 flex-col">
            <p className="text-primaryBlack font-semibold">ID de solicitud:</p>
            <p className="text-primary font-semibold text-18">{title}</p>
          </div>
        </div>
        <div>
          {expediente !== null && expediente !== undefined ? (
            <div className="text-16">
              <Link
                className={classes.irAExpediente}
                to={`/mis-expedientes/ver-expediente/${expediente}`}
                style={{ color: '#023E73', textDecoration: 'none' }}
              >
                Ir a Expediente Digital
              </Link>
            </div>
          ) : (
            ''
          )}
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link to="/" style={{ color: '#023E73' }}>
              {' '}
              Inicio{' '}
            </Link>
            <Link to="/solicitudes" style={{ color: '#023E73' }}>
              Mis solicitudes
            </Link>

            <p style={{ color: '#023E73' }}>{title}</p>
          </Breadcrumbs>
          <div className={classes.indicadorEtapa}>{indicadorEtapa}</div>
        </div>
      </div>
    </div>
  );
};

export default CustomHeaderName;
