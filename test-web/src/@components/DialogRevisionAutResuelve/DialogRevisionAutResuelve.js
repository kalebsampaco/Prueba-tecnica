/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react';

import { Dialog, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import CustomButton from '@components/CustomButton';
import CustomTextField from '@components/CustomTextField';
import { TrashIcon } from '@components/FuseSvgIcon';
import { addDays, format } from 'date-fns';

import API from 'app/services/constants/api';
import { useParams } from 'react-router-dom';
import {
  getPreviewAutoResuelveEtapaOne,
  getPreviewDocumentResolucion,
} from 'app/main/apps/RolFuncionario/solicitudes/store/evaluacionesSlice';
import { deleteFile } from 'app/utils/uploadFile';
import { useDispatch } from 'react-redux';
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

const DialogRevisionAutResuelve = (props) => {
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
  } = props;
  const classes = useStyles();

  const routeParams = useParams();
  const dispatch = useDispatch();

  const generateCreacion =
    itemActoAdm && itemActoAdm?.aa_fecha_creacion
      ? `${format(new Date(itemActoAdm?.aa_fecha_creacion), 'yyyy-MM-dd')}T00:00`
      : new Date();

  const [firma, setFirma] = useState();
  const [firmaTwo, setFirmaTwo] = useState();

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

  const handleViewDocument = async () => {
    const body = {
      aa_id_solicitud: routeParams.id,
      aa_cuerpo_doc: correctSignature(itemActoAdm?.aa_cuerpo_doc),
    };
    let response;
    response = await dispatch(getPreviewDocumentResolucion(body, 'autoResuelveRecurso'));
    if (!response) {
      response = await dispatch(getPreviewAutoResuelveEtapaOne(body, 'autoResuelveRecurso'));
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

  return (
    <Dialog open={open} fullScreen className={classes.screenDialog}>
      <div className="py-14 px-20 min-w-full h-full">
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
          className="border-2 border-dashed p-24 flex flex-col"
          style={{ borderColor: '#0F81E5' }}
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
                <span className="font-bold">Fuente:</span> Auto recurso
              </Typography>
            </div>
            <div>
              <div
                style={{
                  border: '1px solid #3ABDA8',
                  backgroundColor: '#CDFFF7',
                  height: 'fit-content',
                }}
                className="py-10 px-24 rounded-8 mb-12"
              >
                <Typography style={{ color: '#3ABDA8' }}>
                  <CheckCircleIcon className="mr-6" style={{ color: '#3ABDA8' }} />{' '}
                  <strong>Proyectado por:</strong>
                  {itemActoAdm?.fk_creador?.cli_usuario?.cu_nombres}{' '}
                  {itemActoAdm?.fk_creador?.cli_usuario?.cu_apellidos}
                </Typography>
              </div>
              {status === 4 && (
                <div
                  style={{
                    border: '1px solid #3ABDA8',
                    backgroundColor: '#CDFFF7',
                    height: 'fit-content',
                  }}
                  className="py-10 px-24 rounded-8 mb-12"
                >
                  <Typography style={{ color: '#3ABDA8' }}>
                    <CheckCircleIcon className="mr-6" style={{ color: '#3ABDA8' }} />{' '}
                    <strong>Revisado por:</strong>
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
                  className="py-10 px-24 rounded-8 mt-12"
                >
                  <Typography style={{ color: '#3ABDA8' }}>
                    <CheckCircleIcon className="mr-6" style={{ color: '#3ABDA8' }} />{' '}
                    <strong>Firmado por:</strong> {reviewerTwo}
                  </Typography>
                </div>
              )}
            </div>
          </div>
          <div className="w-full  h-full flex">
            <div
              className="p-10 w-3/4 overflow-auto mr-6"
              style={{ border: '1px solid rgba(0, 0, 0, 0.19)', maxHeight: 415 }}
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
              <div className="w-full mt-8 flex justify-end">
                <CustomButton
                  label="Agregar corrección"
                  className="secondary"
                  height="small"
                  onClick={onClickFix}
                  disabled={valueFix === ''}
                />
              </div>
              <div className="mt-12 ">
                <Typography style={{ color: '#023E73' }} className="font-medium text-14 mb-8">
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
                  className="mt-12 flex items-center justify-center"
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
          <div className="flex justify-between w-full mt-24">
            <div className="flex">
              <div className="mr-32" style={{ width: 200 }}>
                <Typography className="text-primary font-bold">
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_nombres}{' '}
                  {itemActoAdm?.fk_firmante?.cli_usuario?.cu_apellidos}
                </Typography>
                <Typography className="text-primary font-bold">
                  ({itemActoAdm?.fk_firmante?.fk_roles?.rol_cliente?.rc_nombre})
                </Typography>
              </div>
              {dobleFirma && (
                <div style={{ width: 200 }}>
                  <Typography className="text-primary font-bold">{nameManagerTwo}</Typography>
                  <Typography className="text-primary font-bold">{managerTwo}</Typography>
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
              {status === 2 ? (
                <div>
                  <CustomButton
                    height="medium"
                    label="Aprobar y enviar a firma"
                    className="primary"
                    onClick={onClickAprobar}
                    disabled={arrayFix?.length > 0}
                  />
                </div>
              ) : (
                <div>
                  <CustomButton
                    height="medium"
                    label="Firmar y notificar auto"
                    className="primary"
                    onClick={onClickSendFirma}
                    disabled={arrayFix?.length > 0}
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

export default DialogRevisionAutResuelve;
