/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import CustomButton from '@components/CustomButton';
import CustomTextField from '@components/CustomTextField';
import { TrashIcon, Warning } from '@components/FuseSvgIcon';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';
import API from 'app/services/constants/api';
import CoomonFirmaAdministrativo from 'app/main/apps/tramitesAmbientales/default/common/views/requester/CoomonFirmaAdministratvivo';
import { useParams } from 'react-router-dom';
import ApplicantFirmaAutos from 'app/main/apps/tramitesAmbientales/default/adapters/ApplicantFirmaAutos';
import { confirmarFirmaSolicitudAdministrativo } from 'app/main/apps/tramitesAmbientales/default/store/DefaultSlice';
import { deleteFile } from 'app/utils/uploadFile';
import { getPreviewDocumentTramiteAnormal } from 'app/main/apps/solicitudes/store/TramiteAnormalSlice';
import correctSignature from 'app/utils/functions/correctSignature';

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
}));

const DialogRevisionTermination = (props) => {
  const {
    open,
    // open: recibe booleano que indica que el Dialog está abierto
    close,
    // close: recibe función para cerrar el Dialog
    label,
    // label: recibe titulo (Auto recurso(xxx), Auto recurso...)
    managerTwo,
    // string con el nombre del rol encargado de la revisión
    nameManagerTwo,
    // nombre de la persona encargada de la revisión
    nameProject,
    // nombre de la persona que proyectó el acto administrativp
    onChangeFix,
    // funcion para el textfield de correciones
    onClickFix,
    // Funcion para el botón que agrega correciones
    deleteFix,
    // Funcion para eliminar una correccion
    valueFix,
    // valor del textfield de correcciones
    arrayFix,
    // array que almacena las correcciones agregadas
    onClickDevolver,
    onClickAprobar,
    status,
    // 1: Revisar
    // 2: Revisar y Firmar
    // 3: Revisar y firma uno
    reviewer,
    // Nombre de la persona que hizo la primera revisión, se usa en Revisión y firma
    reviewerTwo,
    // Nombre de la persona que hizo la segunda revisión, se usa en Revisión y firma
    onClickFirma,
    // funcion para botón de firmar en status 2
    onClickSendFirma,
    // funcion para botón de firmar en status 3
    dobleFirma,
    itemActoAdm,
    itemGestion,
    currentStepTram,
    fixes,
    itemCorreciones,
    dataTramTermination,
    typePlantilla,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const generateCreacion =
    itemActoAdm && itemActoAdm?.aa_fecha_creacion
      ? `${format(new Date(itemActoAdm?.aa_fecha_creacion), 'yyyy-MM-dd')}T00:00`
      : new Date();

  const [disableFirm, setDisableFirm] = useState(true);
  const [disableCode, setDisableCode] = useState(false);
  const [dialogFix, setDialogFix] = useState(false);
  const routeParams = useParams();

  // Formulario para firma OPT de autos
  const [formFirma, setFormFirma] = useState({
    telefono: '',
    codigo: '',
  });

  // Limite de intentos
  const [dataCodigo, setDataCodigo] = useState(0);

  useEffect(() => {
    if (dataCodigo > 3) {
      setTimeout(() => {
        close();
      }, 2000);
    }
  }, [dataCodigo]);

  const onClickOpenCode = () => {
    setDisableCode(true);
  };

  // Confirmar codigo de firma
  const handleConfirmCode = async () => {
    setDataCodigo(dataCodigo + 1);

    const body = ApplicantFirmaAutos(formFirma, routeParams.id);

    const result = await dispatch(confirmarFirmaSolicitudAdministrativo(body, dataCodigo));
    if (result?.status === 'success') {
      onClickSendFirma();
    }
  };

  const handleViewDocument = async () => {
    const body = {
      aa_id_solicitud: routeParams.id,
      aa_cuerpo_doc: correctSignature(itemActoAdm?.aa_cuerpo_doc),
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

  //   const hash = {};
  //   const filteredAutoresCorrecion = itemActoAdm?.acto_correccion
  //     .map((cor) => cor?.fk_creador?.cli_usuario)
  //     // eslint-disable-next-line no-return-assign
  //     .filter((o) => (hash[o?.cu_id] ? false : (hash[o?.cu_id] = true)));

  return (
    <Dialog open={open} fullScreen className={classes.screenDialog}>
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
      <div className="min-w-full px-20 py-14 ">
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
          style={{ borderColor: '#0F81E5', minHeight: '820px', height: 'auto' }}
        >
          <div className="flex justify-between mb-16">
            <div>
              <img src="/assets/images/logos/cortolimaLogo.png" className="mb-16" />
              {itemActoAdm && itemActoAdm?.aa_fecha_creacion && (
                <Typography className="font-bold text-primary">
                  {format(addDays(new Date(generateCreacion), 1), 'dd')} de{' '}
                  {format(new Date(generateCreacion), 'MM')} de{' '}
                  {format(new Date(generateCreacion), 'yyyy')}
                </Typography>
              )}
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
                <span className="font-bold">Referencia:</span> Auto de terminacion anormal
              </Typography>
              <Typography className="text-primary">
                <span className="font-bold">Fuente:</span> {itemGestion?.fk_tra_tramite?.tt_nombre}
              </Typography>
            </div>
            {fixes && (
              <div
                className="flex w-1/3 p-10 border-dashed border-1 rounded-12 mr-44"
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
                    Por favor revise el documento con las siguientes <strong>correcciones</strong>{' '}
                    solicitadas por {itemActoAdm?.fk_firmante?.cli_usuario?.cu_nombres}{' '}
                    {itemActoAdm?.fk_firmante?.cli_usuario?.cu_apellidos}:
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
            <div>
              <div
                style={{
                  border: '1px solid #3ABDA8',
                  backgroundColor: '#CDFFF7',
                  height: 'fit-content',
                }}
                className="px-24 py-10 mb-12 rounded-8"
              >
                <Typography style={{ color: '#3ABDA8' }}>
                  <CheckCircleIcon className="mr-6" style={{ color: '#3ABDA8' }} />{' '}
                  <strong>Proyectado por: </strong>
                  {itemActoAdm?.fk_creador?.cli_usuario?.cu_nombres}{' '}
                  {itemActoAdm?.fk_creador?.cli_usuario?.cu_apellidos}
                </Typography>
              </div>
              {status === 3 && (
                <div
                  style={{
                    border: '1px solid #3ABDA8',
                    backgroundColor: '#CDFFF7',
                    height: 'fit-content',
                  }}
                  className="px-24 py-10 mb-12 rounded-8"
                >
                  <Typography style={{ color: '#3ABDA8' }}>
                    <CheckCircleIcon className="mr-6" style={{ color: '#3ABDA8' }} />{' '}
                    <strong>Revisado por: </strong>
                    {itemActoAdm?.fk_revisor_1?.cli_usuario?.cu_nombres}{' '}
                    {itemActoAdm?.fk_revisor_1?.cli_usuario?.cu_apellidos}
                  </Typography>
                </div>
              )}
              {dobleFirma && status === 2 && (
                <div
                  style={{
                    border: '1px solid #3ABDA8',
                    backgroundColor: '#CDFFF7',
                    height: 'fit-content',
                  }}
                  className="px-24 py-10 mt-12 rounded-8"
                >
                  <Typography style={{ color: '#3ABDA8' }}>
                    <CheckCircleIcon className="mr-6" style={{ color: '#3ABDA8' }} />{' '}
                    <strong>Firmado por:</strong> {reviewerTwo}
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full h-full">
            <div
              className="w-3/4 p-10 mr-6 overflow-auto"
              style={{
                border: '1px solid rgba(0, 0, 0, 0.19)',
                maxHeight: 415,
                minHeight: 415,
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: props.itemActoAdm?.aa_cuerpo_doc,
                }}
              />
            </div>
            <div className="w-1/4 p-12 ml-6">
              <Typography style={{ color: '#4C647A' }} className="font-semibold">
                Agregue las correcciones requeridas (si aplica):
              </Typography>
              <div className="mt-10 ">
                <CustomTextField
                  label="Ingrese aquí su corrección (opcional)"
                  multiline
                  rows={2}
                  value={valueFix}
                  onChange={onChangeFix}
                />
              </div>
              <div className="flex justify-end w-full mt-8">
                <CustomButton
                  label="Agregar corrección"
                  className="secondary"
                  height="small"
                  onClick={onClickFix}
                  disabled={valueFix === ''}
                />
              </div>
              <div className="mt-12 ">
                <Typography style={{ color: '#023E73' }} className="mb-8 font-medium text-14">
                  Correcciones agregadas:
                </Typography>
                <div className="overflow-y-scroll" style={{ maxHeight: 145 }}>
                  {arrayFix?.map((n, i) => {
                    return (
                      <div className="flex items-center ">
                        <div className="w-full ">
                          <Typography style={{ color: '#647F97' }}>
                            {i + 1}. {n.ac_correccion}
                          </Typography>
                        </div>

                        <IconButton onClick={deleteFix(i)}>
                          <TrashIcon />
                        </IconButton>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {status === 4 && disableCode && (
            <CoomonFirmaAdministrativo
              formFirma={formFirma}
              setFormFirma={setFormFirma}
              setDisabledFirma={setDisableFirm}
              routeParams={routeParams}
              titleFirma="Firma de Auto prórroga"
            />
          )}
          <div className="flex">
            {/* {status === 2 || status === 4 ? (
              <div className="mr-32">
                <div
                  id="img1"
                  className="mt-12"
                  style={{
                    border: '1px dashed #0F574B',
                    backgroundColor: '#CDFFF7',
                    width: 200,
                    height: 70,
                  }}
                >
                  {firma}
                </div>
              </div>
            ) : null} */}

            {status === 4 && (
              <div>
                <div
                  id="img1"
                  className="flex items-center justify-center mt-12"
                  style={{
                    border: '1px dashed #0F574B',
                    backgroundColor: '#CDFFF7',
                    width: 200,
                    height: 70,
                  }}
                >
                  <img
                    src={`${API.url_bucket}/${itemActoAdm?.fk_firmante?.usr_id}/${itemActoAdm?.fk_firmante?.cli_usuario?.cu_firma}`}
                    style={{ height: 65, maxWidth: 200 }}
                    alt="Firma"
                  />
                </div>
              </div>
            )}
          </div>
          {status === 3 && disableCode && (
            <CoomonFirmaAdministrativo
              formFirma={formFirma}
              setFormFirma={setFormFirma}
              setDisabledFirma={setDisableFirm}
              routeParams={routeParams}
              titleFirma="Firma de Auto terminacion anormal"
            />
          )}
          <div className="flex justify-between w-full mt-44 ">
            <div className="flex">
              <div className="mr-32" style={{ width: 200 }}>
                <Typography className="font-bold text-primary">
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_nombres}{' '}
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_apellidos}
                </Typography>
                <Typography className="font-bold text-primary">
                  ( {itemActoAdm?.fk_firmante?.fk_roles?.rol_cliente?.rc_nombre} )
                </Typography>
              </div>
              {dobleFirma && (
                <div style={{ width: 200 }}>
                  <Typography className="font-bold text-primary">{nameManagerTwo}</Typography>
                  <Typography className="font-bold text-primary">{managerTwo}</Typography>
                </div>
              )}
            </div>
            <div className="flex">
              <div className="mr-10">
                <CustomButton
                  height="medium"
                  label="Devolver para corrección"
                  className="error"
                  onClick={onClickDevolver}
                  disabled={
                    arrayFix?.length === 0 &&
                    itemGestion?.ss_paso_actual !== 4 &&
                    itemGestion?.ss_paso_actual !== 3
                  }
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
              {status === 2 && (
                <div>
                  <CustomButton
                    height="medium"
                    label="Aprobar y enviar a firma"
                    className="primary"
                    onClick={onClickAprobar}
                    disabled={arrayFix?.length > 0 || itemGestion?.ss_paso_actual === 3}
                  />
                </div>
              )}
              {status === 3 && !disableCode && (
                <div>
                  <CustomButton
                    height="medium"
                    label="Firmar documento"
                    className="primary"
                    onClick={onClickOpenCode}
                    disabled={arrayFix?.length > 0}
                  />
                </div>
              )}

              {status === 3 && disableCode && (
                <div>
                  <CustomButton
                    height="medium"
                    label="Notificar auto"
                    className="primary"
                    onClick={handleConfirmCode}
                    disabled={
                      arrayFix?.length > 0 || formFirma.codigo === '' || formFirma.telefono === ''
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogRevisionTermination;
