/* eslint-disable no-nested-ternary */
import { IconButton, Tooltip, Typography, Button, CircularProgress } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { ExclamationIcon } from '@components/FuseSvgIcon';
import TrashIcon from '@components/FuseSvgIcon/TrashIcon';
import API from 'app/services/constants/api';

const CustomUploadFile = (props) => {
  const {
    disabled,
    value,
    status,
    handleUploadChange,
    handleUploadDelete,
    loading,
    height,
    className,
    elementTitle,
    moreText,
    viewFile,
    name,
    handleUploadDeleteAll,
  } = props;
  const dispatch = useDispatch();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/jpeg, image/png, .doc, .docx, .xlsx, application/pdf',
    maxSize: process.env.REACT_APP_MAX_SIZE_ARCHIVE,
    disabled: disabled || status === 3,
    onDropRejected: async () => {
      await dispatch(
        showMessage({
          message: `Los archivos que adjuntes no deben superar los 200MB`,
          variant: 'error',
        })
      );
    },
    onDrop: (acceptedValue) => handleUploadChange(acceptedValue),
  });

  const marginTop =
    value && value.length === 0
      ? 0
      : value && value.length === 1
      ? height === 'small'
        ? '-84px'
        : '-75px'
      : value && value.length === 2
      ? height === 'small'
        ? '-114px'
        : '-111px'
      : value && value.length === 3
      ? height === 'small'
        ? '-116px'
        : '-150px'
      : value && value.length >= 4
      ? height === 'small'
        ? '-116px'
        : '-173px'
      : height === 'mini'
      ? '0px'
      : '-75px';
  const marginTopDev =
    value && value.length === 0
      ? 0
      : value && value.length === 1
      ? '-40px'
      : value && value.length === 2
      ? '-75px'
      : value && value.length === 3
      ? '-115px'
      : value && value.length >= 4
      ? '-140px'
      : height === 'mini'
      ? '0px'
      : '-75px';

  const marBot =
    value && value.length === 0
      ? height === 'small'
        ? 0
        : 0
      : value && value.length === 1
      ? height === 'small'
        ? 40
        : 40
      : value && value.length >= 2
      ? height === 'small'
        ? 55
        : 40
      : 0;

  const showFile =
    value &&
    value.map((file, i) => (
      <Tooltip placement="top" title={`ver_archivo_${i + 1}`} key={i}>
        <div
          key={file.name}
          className="flex justify-between p-4 my-4 "
          style={{ backgroundColor: '#E6F0FA' }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'pre',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}
          >
            {viewFile ? (
              <Button
                href={`${API.url_bucket}/${file.sa_id_creador}/${file.sa_id_solicitud}/solicitud/${file.sa_archivo}`}
                target="_blank"
                role="button"
                className="p-0 font-bold text-12 text-ellipsis "
                style={{
                  color:
                    status === 1
                      ? '#FF4D4D'
                      : status === 2
                      ? '#FFC438'
                      : status === 3
                      ? '#3ABDA8'
                      : status === 99
                      ? '#FF4D4D'
                      : '#BDD7EF',
                }}
                disabled={loading}
              >
                {`Ver archivo ${i + 1}`}
              </Button>
            ) : (
              <Typography
                style={{
                  color:
                    status === 1
                      ? '#FF4D4D'
                      : status === 2
                      ? '#FFC438'
                      : status === 3
                      ? '#3ABDA8'
                      : status === 99
                      ? '#FF4D4D'
                      : '#BDD7EF',
                }}
                className="font-bold text-12 text-ellipsis"
              >{`Archivo ${i + 1}`}</Typography>
            )}
            {loading ? <CircularProgress color="success" size={12} className="ml-8" /> : null}
          </div>
          <div className="flex justify-center">
            {status !== 3 && status !== 1 && (
              <IconButton
                onClick={handleUploadDelete(file, i, name)}
                disabled={loading}
                className="p-0"
              >
                <TrashIcon style={{ color: status === 1 ? '#FF4D4D' : '' }} />
              </IconButton>
            )}
          </div>
        </div>
      </Tooltip>
    ));

  return (
    <div style={{ marginBottom: marBot }}>
      <div>
        <div id="box" {...getRootProps()}>
          <input multiple {...getInputProps()} />
          <div
            className={
              disabled
                ? 'w-full flex justify-center items-start rounded-8 border-solid border-1  p-16'
                : status === 1
                ? 'w-full flex justify-center items-start rounded-8 border-dashed border-2 p-16'
                : 'w-full flex justify-center items-start rounded-8 border-dashed cursor-pointer border-2 p-16'
            }
            style={
              disabled
                ? {
                    backgroundColor: className === 'secondary' ? '#fff' : '#E6F0FA',
                    borderColor: status === 1 ? '#FF4D4D' : '#9DB8D1',
                    maxHeight: height === 'small' ? 120 : 200,
                  }
                : {
                    backgroundColor: className === 'secondary' ? '#fff' : '#F9FCFF',
                    borderColor:
                      status === 3
                        ? '#3ABDA8'
                        : status === 2
                        ? '#FFC438'
                        : status === 1
                        ? '#FF4D4D'
                        : status === 99
                        ? '#FF4D4D'
                        : '#BDD7EF',
                    maxHeight: height === 'small' ? 120 : 200,
                  }
            }
          >
            {status === 3 ? (
              <div className="flex flex-col">
                <div className="flex self-center">
                  <CheckCircleIcon className="mr-12" style={{ color: '#3ABDA8' }} />
                  <Typography className="text-16" style={{ color: '#3ABDA8' }}>
                    (Validado)
                  </Typography>
                </div>
                <div
                  className="items-center "
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  <div className="overflow-y-scroll max-h-128 ">
                    <div className="flex flex-col overflow-y-scroll ">
                      <div style={{ maxHeight: 128 }}>
                        <div style={{ maxHeight: height === 'small' ? 75 : 128 }}>
                          {value?.map((file, i) => (
                            <div key={i} style={{ height: 32 }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*---------------------------------------------------------------------------------------------------------------------------------*/}
                </div>
              </div>
            ) : (status && status === 1) || (status && status === 99) ? (
              <div className="flex flex-col w-full">
                <div className="relative flex flex-row items-center justify-center w-full gap-8">
                  <ExclamationIcon fill="#FF4D4D" width="16" height="16" />
                  <Typography className="text-16" style={{ color: '#FF4D4D' }}>
                    (Devuelto)
                  </Typography>
                  {loading ? <CircularProgress color="success" size={12} className="ml-8" /> : null}
                  {handleUploadDeleteAll && value && value.length > 0 && (
                    <IconButton
                      disabled={loading}
                      onClick={handleUploadDeleteAll(value, name)}
                      className="absolute right-0"
                    >
                      <TrashIcon style={{ color: '#FF4D4D' }} />
                    </IconButton>
                  )}
                </div>
                <div style={{ maxHeight: 150 }}>
                  {value?.map((file, i) => (
                    <div style={{ height: 30 }} key={i} />
                  ))}
                </div>
              </div>
            ) : status === 2 ? (
              <div className="flex">
                <div className="flex">
                  <div className="mr-12">
                    <ExclamationIcon fill="#FFC438" width="16" height="16" />
                  </div>
                  <Typography className="text-16" style={{ color: '#FFC438' }}>
                    (Corregido)
                  </Typography>
                </div>
                <div style={{ maxHeight: 150 }}>
                  {value?.map((file, i) => (
                    <div style={{ height: 40 }} key={i} />
                  ))}
                </div>
              </div>
            ) : value && value.length === 0 ? (
              <div className="flex justify-between items-center">
                <Typography
                  className={height === 'small' ? 'text-14 m-8' : 'text-14 m-24'}
                  style={disabled ? { color: '#9DB8D1' } : { color: '#7F9BB4' }}
                >
                  <span className={disabled ? '' : 'font-bold'}>
                    Suelta{' '}
                    {elementTitle !== '' && elementTitle !== undefined
                      ? elementTitle
                      : 'el archivo'}
                  </span>{' '}
                  aquí o <span className={disabled ? '' : 'font-bold'}>haz clic</span> para adjuntar
                  {moreText}
                </Typography>
                {loading ? <CircularProgress color="success" size={18} className="ml-8" /> : null}
              </div>
            ) : value && value.length !== 0 ? (
              <div
                className="items-center "
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
              >
                <div style={{ maxHeight: height === 'small' ? 75 : 128 }}>
                  {value.map((item, i) => (
                    <div style={{ height: 32 }} key={`item-${i}`} />
                  ))}
                </div>

                <Typography className="text-14" style={{ color: '#7F9BB4' }}>
                  <span className="font-bold">haz clic</span> para adjuntar
                </Typography>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <Typography className="m-24 text-14" style={{ color: '#7F9BB4' }}>
                  <span className="font-bold">
                    Suelta{' '}
                    {elementTitle !== '' && elementTitle !== undefined
                      ? elementTitle
                      : 'el archivo'}
                  </span>{' '}
                  aquí o <span className="font-bold">haz clic</span> para adjuntar
                </Typography>
                {loading ? <CircularProgress color="success" size={18} className="ml-8" /> : null}
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={
          height === 'small'
            ? 'max-h-72 overflow-y-scroll relative'
            : 'max-h-128 overflow-y-scroll relative'
        }
        style={{
          marginTop: status === 3 || status === 2 || status === 1 ? marginTopDev : marginTop,
          maxWidth: '100%',
        }}
      >
        <div className="flex flex-col pr-0 ml-10 ">{showFile}</div>
      </div>
    </div>
  );
};

export default CustomUploadFile;
