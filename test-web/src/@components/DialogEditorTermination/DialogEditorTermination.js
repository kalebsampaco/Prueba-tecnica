/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';
import { Button, Dialog, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '@components/CustomButton';
import { Warning } from '@components/FuseSvgIcon';
import history from '@history';
import { EditorState } from 'draft-js';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import WYSIWYGEditorTwo from 'app/shared-components/WYSIWYGEditorTwo';
import { addDays, format } from 'date-fns';
import { showMessage } from 'app/store/fuse/messageSlice';
import CustomDialog from '@components/CustomDialog';
import { es } from 'date-fns/locale';
import { deleteFile } from 'app/utils/uploadFile';
import correctSignature from 'app/utils/functions/correctSignature';
import {
  updateBorradorActoAdminstrativoTramiteAnormal,
  createRevisionActoAdministrativoTramiteAnormal,
  getPreviewDocumentTramiteAnormal,
} from 'app/main/apps/solicitudes/store/TramiteAnormalSlice';
import { getActoAdministrativoTramiteAnormal } from '../../app/main/apps/RolFuncionario/solicitudes/store/TramiteAnormalSlice';
import EditorComponent from '@components/EditorComponent/EditorComponent';

const useStyles = makeStyles(() => ({
  screenDialog: {
    '& .MuiDialog-paper': {
      height: '95%',
      width: '95%',
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 10,
      paddingBottom: 10,
    },
  },
  paper: {
    '& .MuiPaper-root': {
      maxWidth: '50%',
      minHeight: '50%',
    },
  },
}));

const DialogEditorTermination = (props) => {
  const {
    open,
    // open: recibe booleano que indica que el Dialog está abierto
    close,
    // close: recibe función para cerrar el Dialog
    onChange,
    // onChange: recibe funcion del campo de texto
    nameManager,
    // nombre de la persona encargada de la revisión
    managerTwo,
    // string con el nombre del segundo rol encargado de la revisión
    nameManagerTwo,
    // nombre de la segunda persona encargada de la revisión
    fixes,
    // fixes: recibe booleano, si hay correcciones
    label,
    // label: recibe titulo (Auto recurso(xxx), Auto recurso...)
    setDialogEditor,
    itemActoAdm,
    itemCorreciones,
    itemSolicitud,
    itemGestion,
    dataTramTermination,
    downloadFile,
    typePlantilla,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();

  const [dialogFix, setDialogFix] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [editorAutoRec, setEditorAutoRec] = useState(EditorState.createEmpty());
  const [editorAutoRecTwo, setEditorAutoRecTwo] = useState();

  console.log(fixes);

  //! Preguntar
  const handleBorrador = async () => {
    const body = {
      aa_estado: 1,
      aa_cuerpo_doc: correctSignature(editorAutoRecTwo || itemActoAdm?.aa_cuerpo_doc),
    };
    const resultBorrador = await dispatch(
      updateBorradorActoAdminstrativoTramiteAnormal(body, routeParams.id)
    );
    if (resultBorrador.status === 200) {
      await dispatch(showMessage({ message: '¡Borrador guardado con éxito!', variant: 'success' }));
      await dispatch(getActoAdministrativoTramiteAnormal(routeParams.id));
      setDialogEditor(false);
    } else {
      await dispatch(
        showMessage({ message: resultBorrador.data.message, variant: resultBorrador.data.status })
      );
    }
  };

  const handleSure = () => {
    setModalAlert(true);
  };

  const hanleRevision = async () => {
    const body = {
      aa_id_solicitud: Number(routeParams?.id),
      aa_cuerpo_doc: correctSignature(editorAutoRecTwo || itemActoAdm?.aa_cuerpo_doc),
    };
    const result = await dispatch(createRevisionActoAdministrativoTramiteAnormal(body));
    if (result?.status === 200) {
      await dispatch(
        showMessage({
          message: '¡Mensaje de revisión auto terminación enviado con exito!',
          variant: 'success',
        })
      );
      history.push('/solicitudes');
    }
  };

  const handleViewDocument = async () => {
    const body = {
      aa_id_solicitud: routeParams?.id,
      aa_cuerpo_doc: correctSignature(editorAutoRecTwo || itemActoAdm?.aa_cuerpo_doc),
      idPlantilla: typePlantilla,
    };
    const response = await dispatch(getPreviewDocumentTramiteAnormal(body));

    if (response) {
      const link = document.createElement('a');
      link.dataType = 'json';
      link.href = response?.href;
      link.target = '_blank';
      link.dispatchEvent(new MouseEvent('click'));
      setTimeout(() => {
        window.URL.revokeObjectURL(response);
      }, 60);
      setTimeout(() => {
        deleteFile(response?.data?.url, response?.data?.fileName);
      }, 3000);
    }
  };

  const openFix = () => {
    setDialogFix(!dialogFix);
  };

  const handleCloseAlert = () => {
    setModalAlert(false);
  };

  const hash = {};
  const filteredAutoresCorrecion = itemActoAdm?.acto_correccion
    .map((cor) => cor?.fk_creador?.cli_usuario)
    // eslint-disable-next-line no-return-assign
    .filter((o) => (hash[o?.cu_id] ? false : (hash[o?.cu_id] = true)));

  console.log(itemActoAdm);

  return (
    <Dialog open={open} fullScreen className={classes.screenDialog}>
      {modalAlert && (
        <CustomDialog
          open={modalAlert}
          img="/assets/images/dialogs/unregistered.png"
          title="¿Está seguro de enviar el documento a revisión?"
          contentText={
            <div className="flex flex-row items-center justify-between w-full">
              <CustomButton
                label="Sí, enviar para revisión"
                className="primary"
                height="medium"
                width="full"
                onClick={hanleRevision}
                style={{ marginRight: 10 }}
              />
              <CustomButton
                label="Cerrar"
                className="error"
                height="medium"
                width="full"
                onClick={handleCloseAlert}
                style={{ marginLeft: 10 }}
              />
            </div>
          }
        />
      )}
      <div className="h-full min-w-full px-20 py-14">
        <Dialog open={dialogFix} className={classes.paper}>
          <div className="p-32 " style={{ maxWidth: 800 }}>
            <Typography className="mb-48 font-bold text-16" style={{ color: '#FF4D4D' }}>
              Correcciones solicitadas al documento:
            </Typography>
            <div className="overflow-y-auto max-h-320">
              <div className="mb-32">
                {itemActoAdm?.acto_correccion?.length > 0 &&
                  itemActoAdm?.acto_correccion?.map((autor, i) => (
                    <>
                      <Typography
                        key={autor?.fk_creador?.cu_id}
                        style={{ color: '#FF4D4D' }}
                        className="mb-8"
                      >
                        {itemActoAdm?.acto_correccion[0]?.aa_fecha_creacion
                          ? format(
                              addDays(
                                new Date(itemActoAdm?.acto_correccion[0]?.aa_fecha_creacion),
                                1
                              ),
                              `yyyy-MMMM-dd (h:mm aaa)`,
                              {
                                locale: es,
                              }
                            )
                          : ''}
                        - Autor:{' '}
                        {`${autor?.fk_creador?.cli_usuario?.cu_nombres} ${autor?.fk_creador?.cli_usuario?.cu_apellidos}`}
                      </Typography>
                      <div
                        style={{
                          width: '100%',
                          backgroundColor: '#2E7EC5',
                          height: 1,
                          marginBottom: 16,
                        }}
                      />
                      <div>
                        <Typography>
                          {i + 1}. {autor?.ac_correccion}
                          <br />
                          <br />
                        </Typography>
                      </div>
                    </>
                  ))}
              </div>
            </div>
            <div className="flex justify-end w-full mt-16">
              <Button
                className="px-16 py-8 rounded-8"
                onClick={openFix}
                style={{
                  backgroundColor: '#CDFFF7',
                  color: '#2E7EC5',
                }}
              >
                Cerrar
              </Button>
            </div>
          </div>
        </Dialog>
        <div className="flex justify-between">
          <Typography style={{ color: '#023E73' }} className="font-semibold text-16">
            <span style={{ color: '#1A796A' }} className="font-semibold text-16">
              Acto administrativo
            </span>{' '}
            - {label}
          </Typography>
          <IconButton onClick={close}>
            <CloseIcon className="text-primary text-24" />
          </IconButton>
        </div>
        <div
          className="flex flex-col p-24 border-2 border-dashed "
          style={{ borderColor: '#0F81E5', minHeight: '92%', height: 'auto' }}
        >
          <div className="flex justify-between mb-16">
            <div>
              <img src="/assets/images/logos/cortolimaLogo.png" className="mb-16" />
              {/* {itemActoAdm && itemActoAdm?.aa_fecha_creacion && (
                <Typography className="font-bold text-primary">
                  {format(addDays(new Date(generateCreacion), 1), 'dd')} de{' '}
                  {format(new Date(generateCreacion), 'MM')} de{' '}
                  {format(new Date(generateCreacion), 'yyyy')}
                </Typography>
              )} */}
              <Typography className="text-primary">
                <span className="font-bold" style={{ color: '#145C9C' }}>
                  Sr(a):
                </span>
                &nbsp;&nbsp;{itemGestion?.fk_creador?.user_solicitante?.us_nombres}{' '}
                {itemGestion?.fk_creador?.user_solicitante?.us_apellidos}
              </Typography>
              <Typography className="text-primary">
                <span className="font-bold" style={{ color: '#145C9C' }}>
                  Dirección:
                </span>
                &nbsp;&nbsp;{itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.tds_direccion}{' '}
                {itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.fk_ciudad?.cty_name}{' '}
                {
                  itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.fk_ciudad?.fk_states
                    ?.st_name
                }
              </Typography>
              <Typography className="text-primary">
                <span className="font-bold" style={{ color: '#145C9C' }}>
                  Tels:
                </span>
                &nbsp;&nbsp;{itemGestion?.fk_creador?.usr_phone?.slice(2)}
              </Typography>
              <Typography className="text-primary">
                <span className="font-bold">Referencia:</span> Auto terminacion anormal
              </Typography>
              <Typography className="text-primary">
                <span className="font-bold">Fuente:</span> {itemGestion?.fk_tra_tramite?.tt_nombre}
              </Typography>
            </div>
            {fixes && (
              <div
                className="flex w-1/3 p-10 border-dashed border-1 rounded-12 "
                style={{
                  backgroundColor: '#FFEDED',
                  borderColor: '#FC0F0F',
                  height: 'fit-content',
                }}
              >
                <div className="mr-8">
                  <Warning fill="#FF4D4D" />
                </div>

                <div>
                  <Typography className="font-bold" style={{ color: '#364A5D' }}>
                    ¡Hola, te han solicitado corregir éste documento!
                  </Typography>
                  <br />
                  <Typography className="font-semibold" style={{ color: '#364A5D' }}>
                    Por favor actualiza el documento con las siguientes{' '}
                    <strong>correcciones</strong> solicitadas por{' '}
                    {filteredAutoresCorrecion?.length > 0 &&
                      filteredAutoresCorrecion?.map(
                        (autor, index) =>
                          `${autor?.cu_nombres} ${autor?.cu_apellidos} ${
                            index === 0 && filteredAutoresCorrecion?.length > 1 ? 'y ' : ''
                          }`
                      )}
                  </Typography>
                  <div className="flex justify-end mt-8">
                    <Button
                      className="px-16 py-8 rounded-8"
                      onClick={openFix}
                      style={{
                        backgroundColor: '#FFF6D6',
                        border: '1px solid #FF4D4D',
                        color: '#FF4D4D',
                      }}
                    >
                      Ver correcciones
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="grid w-full h-full mb-32" style={{ gridTemplateColumns: '85% 15%' }}>
            <div className="w-full h-full">
              <EditorComponent
                onChange={onChange}
                editorState={editorAutoRec}
                setEditorState={setEditorAutoRec}
                editorState2={editorAutoRecTwo}
                setEditorState2={setEditorAutoRecTwo}
                html={itemActoAdm?.aa_cuerpo_doc}
                itemSolicitud={itemSolicitud}
              />
              {/* <WYSIWYGEditorTwo
                onChange={onChange}
                editorState={editorAutoRec}
                setEditorState={setEditorAutoRec}
                editorState2={editorAutoRecTwo}
                setEditorState2={setEditorAutoRecTwo}
                html={itemActoAdm?.aa_cuerpo_doc}
                itemSolicitud={itemSolicitud}
              /> */}
            </div>
          </div>
          <div className="flex justify-between w-full mt-28" style={{ alignSelf: 'end' }}>
            <div className="flex">
              <div className="mr-32">
                <Typography className="font-bold text-primary">
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_nombres}{' '}
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_apellidos}
                </Typography>
                <Typography className="font-bold text-primary">
                  ( {itemActoAdm?.fk_firmante?.fk_roles?.rol_cliente?.rc_nombre} )
                </Typography>
              </div>
              <div className="ml-32">
                <Typography className="font-bold text-primary">{nameManagerTwo}</Typography>
                <Typography className="font-bold text-primary">{managerTwo}</Typography>
              </div>
            </div>
            <div>
              <div className="flex">
                <div className="mr-12">
                  <CustomButton
                    height="medium"
                    label="Guardar Borrador"
                    className="outlineSecondaryLight"
                    onClick={handleBorrador}
                  />
                </div>
                <div className="mr-12">
                  <CustomButton
                    height="medium"
                    label="Visualizar documento"
                    className="outlineSecondaryLight"
                    onClick={handleViewDocument}
                  />
                </div>
                <div>
                  <CustomButton
                    height="medium"
                    label="Enviar documento a revisión"
                    className="primary"
                    onClick={handleSure}
                    disabled={dataTramTermination?.aprobado === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-32" />
      </div>
    </Dialog>
  );
};

export default DialogEditorTermination;
