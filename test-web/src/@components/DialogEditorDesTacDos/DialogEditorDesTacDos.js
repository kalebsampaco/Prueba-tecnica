import { useState } from 'react';
import { Button, Dialog, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from '@components/CustomButton';
import { Warning } from '@components/FuseSvgIcon';
import history from '@history';

import { EditorState, convertToRaw } from 'draft-js';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';

import { addDays, format } from 'date-fns';
import { showMessage } from 'app/store/fuse/messageSlice';
import CustomDialog from '@components/CustomDialog';
import {
  createAutoDecistimientoRevision,
  getAutoDesistimiento,
  updateBorradorDesistiemto,
} from 'app/main/apps/RolFuncionario/solicitudes/store/desistimientoTacitoDosSlice';
import { es } from 'date-fns/locale';
import WYSIWYGEditorTwo from 'app/shared-components/WYSIWYGEditorTwo';
import { getPreviewResolucionEtapaDos } from 'app/main/apps/RolFuncionario/solicitudes/store/evaluacionesSlice';
import { deleteFile } from 'app/utils/uploadFile';
import correctSignature from 'app/utils/functions/correctSignature';
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

const DialogEditorDesTac = (props) => {
  const {
    open,
    // open: recibe booleano que indica que el Dialog está abierto
    close,
    // close: recibe función para cerrar el Dialog
    onChange,
    // onChange: recibe funcion del campo de texto
    managerTwo,
    // string con el nombre del segundo rol encargado de la revisión
    nameManagerTwo,
    // nombre de la segunda persona encargada de la revisión
    fixes,
    // fixes: recibe booleano, si hay correcciones
    label,
    // label: recibe titulo (Desistimento tácito(xxx), Desistimiento tácito...)
    setDialogEditor,
    itemActoAdm,
    itemCorreciones,
    itemSolicitud,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();

  const generateCreacion =
    itemActoAdm && itemActoAdm?.aa_fecha_creacion
      ? `${format(new Date(itemActoAdm?.aa_fecha_creacion), 'yyyy-MM-dd')}T00:00`
      : new Date();
  const [dialogFix, setDialogFix] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const [editorDesistimientoTac, setEditorDesistimientoTac] = useState(EditorState.createEmpty());
  const [editorDesistimientoTacTwo, setEditorDesistimientoTacTwo] = useState();
  const rawContentState = convertToRaw(editorDesistimientoTac.getCurrentContent());
  const markup = draftToHtml(rawContentState);

  const handleBorrador = async () => {
    const body = {
      aa_estado: 1,
      aa_cuerpo_doc: correctSignature(editorDesistimientoTacTwo || itemActoAdm?.aa_cuerpo_doc),
    };
    const resultBorrador = await dispatch(updateBorradorDesistiemto(body, routeParams.id));
    if (resultBorrador.status === 200) {
      await dispatch(showMessage({ message: '¡Borrador guardado con éxito!', variant: 'success' }));
      await dispatch(getAutoDesistimiento(routeParams.id));
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
      aa_id_solicitud: routeParams.id,
      aa_cuerpo_doc: correctSignature(editorDesistimientoTacTwo || itemActoAdm?.aa_cuerpo_doc),
    };
    const resultCreate = await dispatch(createAutoDecistimientoRevision(body));
    if (resultCreate.status === 200) {
      await dispatch(
        showMessage({ message: resultCreate.data.message, variant: resultCreate.data.status })
      );
      setDialogEditor(false);
      setModalAlert(false);
      history.push('/solicitudes');
    } else {
      await dispatch(
        showMessage({ message: resultCreate.data.message, variant: resultCreate.data.status })
      );
    }
  };

  const openFix = () => {
    setDialogFix(!dialogFix);
  };

  const handleCloseAlert = () => {
    setModalAlert(false);
  };

  const handleViewDocument = async () => {
    const body = {
      aa_id_solicitud: routeParams.id,
      aa_cuerpo_doc: correctSignature(editorDesistimientoTacTwo || itemActoAdm?.aa_cuerpo_doc),
    };
    const response = await dispatch(getPreviewResolucionEtapaDos(body, 'autoDesistimiento'));

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
      <div className="py-14 px-20 min-w-full h-full">
        <Dialog open={dialogFix} className={classes.paper}>
          <div className="  p-32" style={{ maxWidth: 800 }}>
            <Typography className="text-16 font-bold mb-48" style={{ color: '#FF4D4D' }}>
              Correcciones solicitadas al documento:
            </Typography>
            <div className="overflow-y-auto max-h-320">
              <div className="mb-32">
                <Typography style={{ color: '#FF4D4D' }} className="mb-8">
                  {itemCorreciones?.aa_fecha_creacion
                    ? format(
                        addDays(new Date(itemCorreciones?.aa_fecha_creacion), 1),
                        `yyyy-MMMM-dd (h:mm aaa)`,
                        {
                          locale: es,
                        }
                      )
                    : ''}
                  - Autor: {itemCorreciones?.fk_creador?.cli_usuario?.cu_nombres}{' '}
                  {itemCorreciones?.fk_creador?.cli_usuario?.cu_apellidos}{' '}
                </Typography>
                <div
                  style={{ width: '100%', backgroundColor: '#2E7EC5', height: 1, marginBottom: 16 }}
                />
                <div>
                  {itemCorreciones?.acto_correccion.map((e, i) => {
                    return (
                      <Typography>
                        {i + 1}. {e?.ac_correccion}
                        <br />
                        <br />
                      </Typography>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-end mt-16">
              <Button
                className="py-8 px-16 rounded-8"
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
          <IconButton onClick={() => setDialogEditor(false)}>
            <CloseIcon className="text-primary text-24" />
          </IconButton>
        </div>
        <div
          className=" border-2 border-dashed p-24 flex flex-col"
          style={{ borderColor: '#0F81E5', height: '92%' }}
        >
          <div className="mb-16 flex justify-between">
            <div>
              <img src="/assets/images/logos/cortolimaLogo.png" className="mb-16" />
              {itemActoAdm && itemActoAdm?.aa_fecha_creacion && (
                <Typography className="text-primary font-bold">
                  {format(addDays(new Date(generateCreacion), 1), 'dd')} de{' '}
                  {format(new Date(generateCreacion), 'MM')} de{' '}
                  {format(new Date(generateCreacion), 'yyyy')}
                </Typography>
              )}
              <Typography className="text-primary">
                <span className="font-bold" style={{ color: '#145C9C' }}>
                  Sr(a):
                </span>
                {itemActoAdm?.fk_sol_solicitud?.fk_usuario?.user_solicitante?.us_nombres}{' '}
                {itemActoAdm?.fk_sol_solicitud?.fk_usuario?.user_solicitante?.us_apellidos}
              </Typography>
              <Typography className="text-primary">
                {itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.tds_direccion}{' '}
                {itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.fk_ciudad?.cty_name}{' '}
                {
                  itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.fk_ciudad?.fk_states
                    ?.st_name
                }
              </Typography>
              <Typography className="text-primary">
                Tels:{' '}
                {itemActoAdm?.fk_sol_solicitud?.fk_usuario?.user_solicitante?.us_celular.slice(2)}
              </Typography>
              <Typography className="text-primary">
                <span className="font-bold">Referencia:</span>{' '}
                {itemActoAdm?.fk_sol_solicitud?.fk_tra_tramite?.tt_nombre}
              </Typography>
              <Typography className="text-primary">
                <span className="font-bold">Fuente:</span> Desistimento tácito
              </Typography>
            </div>
            {fixes && (
              <div
                className="border-dashed border-1 p-10 flex w-1/3 rounded-12 "
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
                    {itemCorreciones?.fk_creador?.cli_usuario?.cu_nombres}{' '}
                    {itemCorreciones?.fk_creador?.cli_usuario?.cu_apellidos}:
                  </Typography>
                  <div className="mt-8 flex justify-end">
                    <Button
                      className="py-8 px-16 rounded-8"
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
          <div className="w-full mb-32 h-full">
            <EditorComponent
              onChange={onChange}
              editorState={editorDesistimientoTac}
              setEditorState={setEditorDesistimientoTac}
              editorState2={editorDesistimientoTacTwo}
              setEditorState2={setEditorDesistimientoTacTwo}
              html={itemActoAdm?.aa_cuerpo_doc}
              itemSolicitud={itemSolicitud}
            />
            {/* <WYSIWYGEditorTwo
              onChange={onChange}
              editorState={editorDesistimientoTac}
              setEditorState={setEditorDesistimientoTac}
              editorState2={editorDesistimientoTacTwo}
              setEditorState2={setEditorDesistimientoTacTwo}
              html={itemActoAdm?.aa_cuerpo_doc}
              itemSolicitud={itemSolicitud}
            /> */}
          </div>
          <div className="flex justify-between w-full" style={{ alignSelf: 'end' }}>
            <div className="flex">
              <div className="mr-32">
                <Typography className="text-primary font-bold">
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_nombres}{' '}
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_apellidos}
                </Typography>
                <Typography className="text-primary font-bold">
                  {itemActoAdm?.fk_firmante?.fk_roles?.rol_cliente?.rc_nombre}
                </Typography>
              </div>
              <div className="ml-32">
                <Typography className="text-primary font-bold">{nameManagerTwo}</Typography>
                <Typography className="text-primary font-bold">{managerTwo}</Typography>
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

export default DialogEditorDesTac;
