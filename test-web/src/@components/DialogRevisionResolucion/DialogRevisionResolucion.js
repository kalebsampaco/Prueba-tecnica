/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';

import { Dialog, IconButton, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CustomDialog from '@components/CustomDialog';

import CustomButton from '@components/CustomButton';
import CustomTextField from '@components/CustomTextField';
import { TrashIcon } from '@components/FuseSvgIcon';
import { addDays, format } from 'date-fns';

import API from 'app/services/constants/api';
import CoomonFirmaAdministrativo from 'app/main/apps/tramitesAmbientales/default/common/views/requester/CoomonFirmaAdministratvivo';
import { useParams } from 'react-router-dom';
import ApplicantFirmaAutos from 'app/main/apps/tramitesAmbientales/default/adapters/ApplicantFirmaAutos';
import { confirmarFirmaSolicitudAdministrativo } from 'app/main/apps/tramitesAmbientales/default/store/DefaultSlice';
import { deleteFile } from 'app/utils/uploadFile';
import { getPreviewDocumentResolucion } from 'app/main/apps/RolFuncionario/solicitudes/store/evaluacionesSlice';

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

const DialogRevision = (props) => {
  const {
    open,
    // open: recibe booleano que indica que el Dialog está abierto
    close,
    // close: recibe función para cerrar el Dialog
    label,
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
    // Nombre de la persona que hizo la primera revisión, se usa en Revisión y firma
    reviewerTwo,
    // funcion para botón de firmar en status 2
    onClickStatus3,
    onClickStatus4,
    // funcion para botón de firmar en status 3
    dobleFirma,
    itemActoAdm,
    infoProcess,
    idTramite,
    pasoActual,
    numberTerritorial,
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const generateCreacion =
    itemActoAdm && itemActoAdm?.aa_fecha_creacion
      ? `${format(new Date(itemActoAdm?.aa_fecha_creacion), 'yyyy-MM-dd')}T00:00`
      : new Date();
  const [firma, setFirma] = useState();
  const [firmaTwo, setFirmaTwo] = useState();
  const [disableFirm, setDisableFirm] = useState();
  const [disableCode, setDisableCode] = useState(false);
  const [modalAlert, setModalAlert] = useState(false);
  const routeParams = useParams();

  // Formulario para firma OPT
  const [formFirma, setFormFirma] = useState({
    telefono: '',
    codigo: '',
  });

  // Limite de intentos para firmar
  const [dataCodigo, setDataCodigo] = useState(0);

  useEffect(() => {
    if (dataCodigo > 3) {
      setTimeout(() => {
        close();
      }, 2000);
    }
  }, [dataCodigo]);

  const firmaChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (file.size > 5000000) {
      console.log('max 5mb');
      return;
    }
    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = async (event) => {
      //   var img = document.getElementById('img1');
      // img.src = event.target.result;
      // // setFirma(img.src)
    };

    reader.onerror = function (error) {
      console.log('error on load image', error);
    };
  };
  console.log('itemActoAdm', itemActoAdm, idTramite, '<-----------');
  const onClickOpenCode = () => {
    setDisableCode(true);
  };

  // Confirmar codigo de firma
  const handleConfirmCode = async () => {
    //  setOpenDialog(false);
    setDataCodigo(dataCodigo + 1);
    const body = ApplicantFirmaAutos(formFirma, routeParams.id);
    //  setOpenDialog(false);
    const result = await dispatch(confirmarFirmaSolicitudAdministrativo(body, dataCodigo));
    if (result?.status === 'success') {
      onClickStatus3();
      // setItemConfirmSoli(result);
      // setOpen(true);
    }
  };

  const handleConfirmCodeRurH = async () => {
    //  setOpenDialog(false);
    setDataCodigo(dataCodigo + 1);
    const body = ApplicantFirmaAutos(formFirma, routeParams.id);
    //  setOpenDialog(false);
    const result = await dispatch(confirmarFirmaSolicitudAdministrativo(body, dataCodigo));
    if (result?.status === 'success') {
      onClickAprobar();
      // setItemConfirmSoli(result);
      // setOpen(true);
    }
  };

  const handleConfirmCode2 = async () => {
    //  setOpenDialog(false);
    setDataCodigo(dataCodigo + 1);
    const body = ApplicantFirmaAutos(formFirma, routeParams.id);
    //  setOpenDialog(false);
    const result = await dispatch(confirmarFirmaSolicitudAdministrativo(body, dataCodigo));
    if (result?.status === 'success') {
      onClickStatus4();
      // setItemConfirmSoli(result);
      // setOpen(true);
    }
  };

  const handleViewDocument = async () => {
    const body = {
      aa_id_solicitud: routeParams.id,
      aa_cuerpo_doc: props.itemActoAdm.aa_cuerpo_doc,
    };
    let response;
    if (idTramite === 26) {
      response = await dispatch(getPreviewDocumentResolucion(body, 'autoRecursoHidrico'));
    } else {
      response = await dispatch(getPreviewDocumentResolucion(body, 'autoResolucion'));
    }

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

  const handleSure = () => {
    setModalAlert(true);
  };

  const handleCloseAlert = () => {
    setModalAlert(false);
  };

  return (
    <Dialog open={open} fullScreen className={classes.screenDialog}>
      <div className="h-full min-w-full px-20 py-14">
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
          className="flex flex-col p-24 border-2 border-dashed"
          style={{ borderColor: '#0F81E5' }}
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
                <span className="font-bold">Fuente:</span> Resolución
              </Typography>
            </div>
            <div>
              {status === 2 && pasoActual !== 9 && (
                <>
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
                      <strong>Proyectado por:&nbsp;</strong>
                      {itemActoAdm.fk_creador?.cli_usuario?.cu_nombres}{' '}
                      {itemActoAdm.fk_creador?.cli_usuario?.cu_apellidos}
                    </Typography>
                  </div>
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
                      <strong>Revisado por:&nbsp;</strong>
                      {itemActoAdm.fk_revisor_1?.cli_usuario?.cu_nombres}{' '}
                      {itemActoAdm.fk_revisor_1?.cli_usuario?.cu_apellidos}
                    </Typography>
                  </div>
                </>
              )}
              {(status === 3 || pasoActual === 9) && (
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
                      <strong>Proyectado por:&nbsp;</strong>
                      {itemActoAdm.fk_creador?.cli_usuario?.cu_nombres}{' '}
                      {itemActoAdm.fk_creador?.cli_usuario?.cu_apellidos}
                    </Typography>
                  </div>
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
                      <strong>Revisado por:&nbsp;</strong>
                      {itemActoAdm.fk_revisor_1?.cli_usuario?.cu_nombres}{' '}
                      {itemActoAdm.fk_revisor_1?.cli_usuario?.cu_apellidos}
                    </Typography>
                  </div>
                </div>
              )}
              {status === 4 && (
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
                      <strong>Proyectado por:&nbsp;</strong>
                      {itemActoAdm.fk_creador?.cli_usuario?.cu_nombres}{' '}
                      {itemActoAdm.fk_creador?.cli_usuario?.cu_apellidos}
                    </Typography>
                  </div>
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
                      <strong>Revisado por:&nbsp;</strong>
                      {itemActoAdm.fk_revisor_1?.cli_usuario?.cu_nombres}{' '}
                      {itemActoAdm.fk_revisor_1?.cli_usuario?.cu_apellidos}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex w-full h-full">
            <div
              className="p-10 mr-6 overflow-auto"
              style={{
                border: '1px solid rgba(0, 0, 0, 0.19)',
                maxHeight: 415,
                width: status === 1 ? '100%' : '75%',
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: props.itemActoAdm.aa_cuerpo_doc,
                }}
              />
            </div>
            {status === 2 && (
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
            )}
            {status === 3 && (
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
            )}
            {status === 4 && (
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
            )}
          </div>
          {status === 4 && disableCode && (
            <CoomonFirmaAdministrativo
              formFirma={formFirma}
              setFormFirma={setFormFirma}
              setDisabledFirma={setDisableFirm}
              routeParams={routeParams}
              titleFirma="Firma de resolución"
            />
          )}

          {status === 3 && disableCode && (
            <CoomonFirmaAdministrativo
              formFirma={formFirma}
              setFormFirma={setFormFirma}
              setDisabledFirma={setDisableFirm}
              routeParams={routeParams}
              titleFirma="Firma de resolución"
            />
          )}
          {status === 2 && disableCode && idTramite === 26 && (
            <CoomonFirmaAdministrativo
              formFirma={formFirma}
              setFormFirma={setFormFirma}
              setDisabledFirma={setDisableFirm}
              routeParams={routeParams}
              titleFirma="Firma de registro"
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

            {status === 3 && (
              <div className="flex flex-row items-center justify-center">
                {itemActoAdm.fk_revisor_2 !== null && (
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
                      src={`${API.url_bucket}/${itemActoAdm.fk_revisor_2?.usr_id}/${itemActoAdm.fk_revisor_2?.cli_usuario?.cu_firma}`}
                      style={{ height: 65, maxWidth: 200 }}
                      alt="Firma"
                    />
                  </div>
                )}
                <div
                  id="img2"
                  className="flex items-center justify-center mt-12 ml-2"
                  style={{
                    border: '1px dashed #0F574B',
                    backgroundColor: '#CDFFF7',
                    width: 200,
                    height: 70,
                  }}
                >
                  {status === 4 && (
                    <img
                      src={`${API.url_bucket}/${itemActoAdm.fk_firmante?.usr_id}/${itemActoAdm.fk_firmante?.cli_usuario?.cu_firma}`}
                      style={{ height: 65, maxWidth: 200 }}
                      alt="Firma"
                    />
                  )}
                </div>
              </div>
            )}
            {status === 4 && (
              <div className="flex flex-row items-center justify-center">
                {itemActoAdm.fk_revisor_2 !== null && (
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
                      src={`${API.url_bucket}/${itemActoAdm.fk_revisor_2?.usr_id}/${itemActoAdm.fk_revisor_2?.cli_usuario?.cu_firma}`}
                      style={{ height: 65, maxWidth: 200 }}
                      alt="Firma"
                    />
                  </div>
                )}
                <div
                  id="img2"
                  className="flex items-center justify-center mt-12 ml-2"
                  style={{
                    border: '1px dashed #0F574B',
                    backgroundColor: '#CDFFF7',
                    width: 200,
                    height: 70,
                  }}
                >
                  {(status === 4 || status === 2) && (
                    <img
                      src={`${API.url_bucket}/${itemActoAdm.fk_firmante?.usr_id}/${itemActoAdm.fk_firmante?.cli_usuario?.cu_firma}`}
                      style={{ height: 65, maxWidth: 200 }}
                      alt="Firma"
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between w-full mt-24">
            <div className="flex">
              {idTramite !== 26 && (
                <>
                  {(itemActoAdm?.fk_revisor_2 !== null ||
                    itemActoAdm?.fk_revisor_2 !== undefined) && (
                    <div style={{ width: 200 }}>
                      <Typography className="font-bold text-primary">
                        {itemActoAdm?.fk_revisor_2?.cli_usuario?.cu_nombres}{' '}
                        {itemActoAdm?.fk_revisor_2?.cli_usuario?.cu_apellidos}
                      </Typography>
                      <Typography className="font-bold text-primary">
                        ({itemActoAdm?.fk_revisor_2?.fk_roles?.rol_cliente?.rc_nombre}{' '}
                        {itemActoAdm?.fk_revisor_2?.cli_usuario?.cu_encargado === 1 ? '(E)' : ''})
                      </Typography>
                    </div>
                  )}
                </>
              )}
              <div className="mr-32" style={{ width: 200 }}>
                <Typography className="font-bold text-primary">
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_nombres}{' '}
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_apellidos}
                </Typography>
                <Typography className="font-bold text-primary">
                  ({itemActoAdm?.fk_firmante?.fk_roles?.rol_cliente?.rc_nombre}{' '}
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_encargado === 1 ? '(E)' : ''})
                </Typography>
              </div>
            </div>
            <div className="flex">
              <div className="mr-10">
                <CustomButton
                  height="medium"
                  label="Devolver para corrección"
                  className="error"
                  onClick={onClickDevolver}
                  disabled={arrayFix?.length === 0}
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
              {status === 2 && (idTramite !== 26 || pasoActual !== 9) && (
                <div>
                  <CustomButton
                    height="medium"
                    label={idTramite === 26 ? 'Aprobar para continuar' : 'Aprobar y enviar a firma'}
                    className="primary"
                    onClick={onClickAprobar}
                    disabled={arrayFix?.length > 0}
                  />
                </div>
              )}
              {status === 2 && idTramite === 26 && disableCode && pasoActual === 9 && (
                <div>
                  <CustomButton
                    height="medium"
                    // label="Firmar y enviar a Firma Dirección"
                    label="Firmar documento"
                    className="primary"
                    onClick={handleConfirmCodeRurH}
                    disabled={
                      arrayFix?.length > 0 || formFirma.codigo === '' || formFirma.telefono === ''
                    }
                  />
                </div>
              )}
              {status === 2 && !disableCode && pasoActual === 9 && (
                <div>
                  <CustomButton
                    height="medium"
                    // label="Firmar y enviar a Firma Dirección"
                    label="Firmar documento"
                    className="primary"
                    // onClick={onClickStatus3}
                    onClick={onClickOpenCode}
                    disabled={arrayFix?.length > 0}
                  />
                </div>
              )}
              {status === 3 && !disableCode && (
                <div>
                  <CustomButton
                    height="medium"
                    // label="Firmar y enviar a Firma Dirección"
                    label="Firmar documento"
                    className="primary"
                    // onClick={onClickStatus3}
                    onClick={onClickOpenCode}
                    disabled={arrayFix?.length > 0}
                  />
                </div>
              )}
              {status === 3 && disableCode && (
                <div>
                  <CustomButton
                    height="medium"
                    // label="Firmar y enviar a Firma Dirección"
                    label={idTramite === 26 ? 'Aprobar para continuar' : 'Aprobar y enviar a firma'}
                    className="primary"
                    // onClick={onClickStatus3}
                    onClick={handleConfirmCode}
                    disabled={
                      arrayFix?.length > 0 || formFirma.codigo === '' || formFirma.telefono === ''
                    }
                  />
                </div>
              )}

              {status === 4 &&
              !disableCode &&
              numberTerritorial === 'Principal' &&
              infoProcess?.ss_paso_actual !== 7 ? (
                <div>
                  <CustomButton
                    height="medium"
                    label="Asignar Numeración"
                    className="primary"
                    onClick={handleSure}
                    disabled={arrayFix?.length > 0}
                  />
                </div>
              ) : (
                status === 4 &&
                !disableCode && (
                  <div>
                    <CustomButton
                      height="medium"
                      label="Firmar auto"
                      className="primary"
                      onClick={onClickOpenCode}
                      disabled={arrayFix?.length > 0}
                    />
                  </div>
                )
              )}
              {status === 4 && disableCode && (
                <div>
                  <CustomButton
                    height="medium"
                    label="Notificar auto"
                    className="primary"
                    onClick={handleConfirmCode2}
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
      {modalAlert && (
        <CustomDialog
          open={modalAlert}
          img="/assets/images/dialogs/unregistered.png"
          title="¿Está seguro de enviar el documento a revisión?"
          contentText={
            <div className="flex flex-row items-center justify-between w-full">
              <CustomButton
                label="Sí, enviar para numeracion"
                className="primary"
                height="medium"
                width="full"
                onClick={onClickStatus4}
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
    </Dialog>
  );
};

export default DialogRevision;
