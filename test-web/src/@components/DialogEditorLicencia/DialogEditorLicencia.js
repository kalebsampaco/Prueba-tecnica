import CustomButton from '@components/CustomButton';
import EditorComponent from '@components/EditorComponent/EditorComponent';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';
import { Dialog, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  getPreviewInformeLicencia,
  updateLicenciaAmbiental,
} from 'app/main/apps/RolFuncionario/solicitudes/store/gestionarSlice';
import CoomonFirmaAdministrativo from 'app/main/apps/tramitesAmbientales/default/common/views/requester/CoomonFirmaAdministratvivo';
import WYSIWYGEditorTwo from 'app/shared-components/WYSIWYGEditorTwo';
import { showMessage } from 'app/store/fuse/messageSlice';
import correctSignature from 'app/utils/functions/correctSignature';
import { deleteFile } from 'app/utils/uploadFile';
import { addDays, format } from 'date-fns';
import { EditorState } from 'draft-js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

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

const DialogEditorLicencia = ({
  open,
  close,
  itemActoAdm,
  professionals,
  routeParams,
  getInformeLicencia,
  stateDoc,
  sendInformeTecnico,
}) => {
  /* Config */
  const classes = useStyles();
  const dispatch = useDispatch();

  /* States */
  const [editorLicencia, setEditorLicencia] = useState(EditorState.createEmpty());
  const [editorLicenciaTwo, setEditorLicenciaTwo] = useState();
  const [openFirma, setOpenFirma] = useState(false);
  const [disableFirm, setDisableFirm] = useState();
  // Formulario para firma OPT
  const [formFirma, setFormFirma] = useState({
    telefono: '',
    codigo: '',
  });

  /* Contantes */
  const generateCreacion =
    itemActoAdm && itemActoAdm?.aa_fecha_creacion
      ? `${format(new Date(itemActoAdm?.aa_fecha_creacion), 'yyyy-MM-dd')}T00:00`
      : new Date();

  /* Functions */
  const handleBorrador = async () => {
    const body = {
      aa_cuerpo_doc: correctSignature(editorLicenciaTwo || itemActoAdm?.aa_cuerpo_doc),
    };

    const resultBorrador = await dispatch(updateLicenciaAmbiental(body, routeParams.id));
    if (resultBorrador.status === 200) {
      await dispatch(
        showMessage({
          message: '¡Borrador guardado con éxito!',
          variant: 'success',
        })
      );
      getInformeLicencia();
      close();
    } else {
      await dispatch(
        showMessage({
          message: '¡Error guardando borrador!',
          variant: resultBorrador.data.status,
        })
      );
    }
  };

  const sendInformeTecnicoDialog = async () => {
    const body = {
      aa_cuerpo_doc: correctSignature(editorLicenciaTwo || itemActoAdm?.aa_cuerpo_doc),
    };
    const resultBorrador = await dispatch(updateLicenciaAmbiental(body, routeParams.id));
    if (resultBorrador.status === 200) {
      await sendInformeTecnico(formFirma.codigo);
    } else {
      await dispatch(
        showMessage({
          message: '¡Error enviando informe tecnico!',
          variant: 'error',
        })
      );
    }
  };

  const handleViewDocument = async () => {
    const body = {
      aa_id_solicitud: routeParams.id,
      aa_cuerpo_doc: correctSignature(editorLicenciaTwo || itemActoAdm?.aa_cuerpo_doc),
    };
    const response = await dispatch(getPreviewInformeLicencia(body));

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
      <div className="min-h-full h-auto min-w-full px-20 py-14">
        <div className="flex justify-between">
          <Typography style={{ color: '#023E73' }} className="font-semibold text-16">
            <span style={{ color: '#1A796A' }} className="font-semibold text-16">
              Generacion
            </span>{' '}
            - Informe Tecnico
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
            <div className="flex w-full items-center">
              <img
                src="/assets/images/logos/cortolimaLogo.png"
                className="mb-16 mr-28 w-[220px] h-[160px]"
                alt="Logo Cortolima"
              />
              <div
                className="flex flex-col justify-between h-full overflow-hidden"
                style={{ width: '400px' }}
              >
                {itemActoAdm && itemActoAdm?.aa_fecha_creacion && (
                  <Typography className=" text-primary">
                    <span className="font-bold" style={{ color: '#145C9C' }}>
                      Fecha de creacion:&nbsp;&nbsp;
                    </span>
                    {format(addDays(new Date(generateCreacion), 1), 'dd')} de{' '}
                    {format(new Date(generateCreacion), 'MM')} de{' '}
                    {format(new Date(generateCreacion), 'yyyy')}
                  </Typography>
                )}
                <Typography className="text-primary">
                  <span className="font-bold" style={{ color: '#145C9C' }}>
                    Sr(a):&nbsp;&nbsp;
                  </span>
                  {itemActoAdm?.fk_sol_solicitud?.fk_usuario?.user_solicitante?.us_nombres}{' '}
                  {itemActoAdm?.fk_sol_solicitud?.fk_usuario?.user_solicitante?.us_apellidos}
                </Typography>
                <Typography className="text-primary">
                  <span className="font-bold" style={{ color: '#145C9C' }}>
                    Dirrecion:&nbsp;&nbsp;
                  </span>
                  {itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.tds_direccion}{' '}
                  {itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.fk_ciudad?.cty_name}{' '}
                  {
                    itemActoAdm?.fk_sol_solicitud?.tram_datos_solicitante?.fk_ciudad?.fk_states
                      ?.st_name
                  }
                </Typography>
              </div>
              <div
                className=" flex flex-col justify-between h-full overflow-hidden"
                style={{ width: '400px' }}
              >
                <Typography className="text-primary">
                  <span className="font-bold">Tels:&nbsp;&nbsp;</span>
                  {itemActoAdm?.fk_sol_solicitud?.fk_usuario?.user_solicitante?.us_celular.slice(2)}
                </Typography>
                <Typography className="text-primary">
                  <span className="font-bold">Referencia:</span> Generacion - Informe Tecnico
                </Typography>
                <Typography className="text-primary">
                  <span className="font-bold">Fuente:&nbsp;&nbsp;</span>
                  {itemActoAdm?.fk_sol_solicitud?.fk_tra_tramite?.tt_nombre}
                </Typography>
              </div>

              {stateDoc?.state && (
                <div style={{ height: 'fit-content', width: '700px' }}>
                  <div
                    className="flex flex-col p-10 border-dashed border-1 rounded-12"
                    style={{ backgroundColor: '#FFF6D6', borderColor: '#FCC500' }}
                  >
                    <div className="flex mb-8">
                      <WarningIcon style={{ color: '#FCC500' }} />
                      <Typography className="mx-8 mt-2 font-bold" style={{ color: '#364A5D' }}>
                        Cuentas con permisos de solo lectura
                      </Typography>
                    </div>
                    <ol className="ml-20 list-disc">
                      <li>
                        El informe técnico ya está siendo gestionado por el profesional{' '}
                        {`${stateDoc?.data?.fk_usuario?.cli_usuario?.cu_nombres} ${stateDoc?.data?.fk_usuario?.cli_usuario?.cu_apellidos}`}
                        . Debes esperar hasta que él termine de gestionar el informe técnico para
                        poder gestionarlo
                      </li>
                    </ol>
                  </div>
                </div>
              )}
            </div>
          </div>

          {stateDoc?.state && (
            <div
              className="p-10 w-full overflow-auto mb-20"
              style={{
                border: '1px solid rgba(0, 0, 0, 0.19)',
                height: '60vh',
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: itemActoAdm?.aa_cuerpo_doc,
                }}
              />
            </div>
          )}

          {!stateDoc?.state && (
            <>
              {/* Editor */}
              <div className="w-full h-full mb-20">
                <EditorComponent
                  onChange={() => {}}
                  editorState={editorLicencia}
                  setEditorState={setEditorLicencia}
                  editorState2={editorLicenciaTwo}
                  setEditorState2={setEditorLicenciaTwo}
                  html={itemActoAdm?.aa_cuerpo_doc}
                  itemSolicitud={{}}
                  height
                />
                {/* <WYSIWYGEditorTwo
                  onChange={() => {}}
                  editorState={editorLicencia}
                  setEditorState={setEditorLicencia}
                  editorState2={editorLicenciaTwo}
                  setEditorState2={setEditorLicenciaTwo}
                  html={itemActoAdm?.aa_cuerpo_doc}
                  itemSolicitud={{}}
                  height
                /> */}
              </div>
            </>
          )}

          {openFirma && (
            <div className="mb-32">
              <CoomonFirmaAdministrativo
                formFirma={formFirma}
                setFormFirma={setFormFirma}
                setDisabledFirma={setDisableFirm}
                routeParams={routeParams}
                titleFirma="Firma del informe tecnico"
              />
            </div>
          )}

          <div className="flex justify-between w-full" style={{ alignSelf: 'end' }}>
            <div className="flex">
              <div className="flex gap-28">
                {professionals?.length > 0 &&
                  professionals?.map((prof) => (
                    <div className="flex flex-col">
                      <Typography className="font-bold text-primary">{`${prof?.user?.cu_nombres} ${prof?.user?.cu_apellidos}`}</Typography>
                      <Typography className="font-bold text-primary">
                        ({prof?.user?.fk_roles?.rol_cliente?.rc_nombre})
                      </Typography>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <div className="flex ">
                <div className="mr-12">
                  <CustomButton
                    height="medium"
                    label="Guardar Borrador"
                    className="outlineSecondaryLight"
                    onClick={handleBorrador}
                    disabled={stateDoc?.state}
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
                  {!openFirma ? (
                    <CustomButton
                      height="medium"
                      label="Firmar documento"
                      className="primary"
                      onClick={() => setOpenFirma(true)}
                    />
                  ) : (
                    <CustomButton
                      height="medium"
                      label="Enviar informe tecnico"
                      className="primary"
                      onClick={sendInformeTecnicoDialog}
                      disabled={formFirma.codigo === '' || formFirma.telefono === ''}
                    />
                  )}
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

export default DialogEditorLicencia;
