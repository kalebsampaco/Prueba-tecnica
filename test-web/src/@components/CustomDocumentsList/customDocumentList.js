import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #F9FCFF',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    // maxWidth: 1000,
    borderRadius: 8,
    margin: 8,
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    background: '#F9FCFF',
  },
}));

const CustomDocumentsList = (props) => {
  const { title, description, content, documents, mode, contentMsg } = props;
  const classes = useStyles();

  return (
    <div>
      {mode === 2 ? (
        <div className={classes.container}>
          <div className="flex items-center justify-between w-full">
            <div style={{ color: '#4C647A' }} className="mr-24 w-288">
              <p className="text-12">{title}</p>
              <p className="text-12">{description}</p>
            </div>
            <div className="flex ml-32 overflow-auto max-h-60">{documents}</div>
          </div>
        </div>
      ) : (
        <div className={classes.container}>
          <div className="flex items-center">
            <div style={{ color: '#4C647A' }} className="mr-10 w-288">
              <p className="font-bold text-14">{title}</p>
              {title === 'Requerimientos decreto 050 de 2018' ? (
                <ul className="text-14 mr-28">
                  <li className="mt-10">Pruebas de infiltración</li>
                  <li>Sistema de disposición del vertimiento</li>
                  <li>Área de disposición del vertimiento</li>
                  <li>Plan de cierre y abandono del área de disposición del vertimiento</li>
                  <li>Línea base del suelo (no domestico)</li>
                  <li>Línea base del agua subterránea (no domestico)</li>
                  <li>Plan de monitoreo (no domestico)</li>
                </ul>
              ) : (
                <p className="mt-10 text-14">{description}</p>
              )}
            </div>
            <div className="ml-14 overflow-auto max-h-60">{documents}</div>
          </div>
          {contentMsg}
          {content}
        </div>
      )}
    </div>
  );
};

export default CustomDocumentsList;
