/* eslint-disable array-callback-return */
import clsx from 'clsx';
import Box from '@mui/material/Box';
import {
  TableHead,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FormControlLabel from '@mui/material/FormControlLabel';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Radio from '@mui/material/Radio';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { getListUsers, setPage, setRowsPerPage } from '../store/userListSlice';

const rows = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'ROL',
    sort: true,
  },
  {
    id: 'nombre',
    align: 'left',
    disablePadding: false,
    label: 'Nombre usuario',
    sort: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: true,
    label: 'Correo electrónico',
    sort: true,
  },
];

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '100%',
    '& label': {
      color: '#000',
      fontWeight: 'bold',
      fontSize: 12,
      top: 0,
    },
    '& input': {
      fontSize: 12,
      color: '#2e2e2e',
    },
    '& .MuiFormHelperText-root': {
      color: 'red',
      marginTop: 4,
      fontWeight: 500,
      textAlign: 'right',
    },
  },
  orderArrow: {
    backgroundColor: '#E6F0FA',
    '& .MuiTableSortLabel-icon': {
      opacity: 1,
    },
    '& span.MuiTableSortLabel-active svg': {
      color: '#000000',
    },
    '& span svg': {
      color: '#00000038',
    },
    '& .MuiInputBase-root': {
      height: 18,
      backgroundColor: 'white',
    },
    '&  table  tbody tr td .MuiFormControl-root': {
      marginTop: 4,
    },
  },
  headFilters: {
    '& .MuiInputBase-root': {
      backgroundColor: '#80808040',
      height: 30,
      // backgroundColor: 'white',
    },
  },
}));

const TableUserSelect = ({ handleClose, form, handleClick, selected }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [itemUsers, setItemUsers] = useState([]);
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'cu_id',
  });

  const pageRedux = useSelector(({ listUserApp }) => listUserApp.userList.page);
  const rowsPerPageRedux = useSelector(({ listUserApp }) => listUserApp.userList.rowsPerPage);
  const totalRedux = useSelector(({ listUserApp }) => listUserApp.userList.totalRows);
  const dataUsers = useSelector(({ listUserApp }) => listUserApp.userList.listUsers);

  useEffect(() => {
    if (dataUsers?.length > 0) {
      // setItemUsers(dataUsers.filter((userS) => userS.cu_estado));
      setItemUsers(dataUsers);
    } else {
      setItemUsers([]);
    }
  }, [dataUsers]);

  const selectRoles = (idRol) => {
    let value;
    switch (idRol) {
      case 5:
        value = 'Director General';
        break;
      case 25:
        value = 'Subdirector Jurídico';
        break;
      case 28:
        value = 'Profesional Recursos';
        break;
      case 20:
        value = 'Planificacion Ambiental';
        break;
      case 19:
        value = 'Ventanilla Unica';
        break;
      case 34:
        value = 'Validacion Juridica';
        break;
      case 23:
        value = 'Juridico';
        break;
      case 22:
        value = 'Financiero';
        break;
      case 29:
        value = 'Secretaria Juridica';
        break;
      case 21:
        value = 'Liquidador';
        break;
      case 32:
        value = 'Coordinador Seguimiento';
        break;
      case 27:
        value = 'Coordinador Recursos';
        break;
      case 26:
        value = 'Jefe territorial';
        break;
      case 30:
        value = 'Supervisor';
        break;
      case 38:
        value = 'Validacion Tecnica';
        break;
      case 47:
        value = 'Validacion';
        break;

      default:
        value = '';
        break;
    }
    return value;
  };

  useEffect(() => {
    async function fetch() {
      await dispatch(
        getListUsers(pageRedux, rowsPerPageRedux, order.id, order.direction, {
          cu_id: '',
          cu_fecha_creacion: '',
          rc_nombre: '',
          cu_nombres: '',
          cu_email: '',
          cu_documento: '',
          cu_celular: '',
          cu_estado: '',
        })
      );
    }
    fetch();
  }, [dispatch, rowsPerPageRedux, pageRedux, order.id, order.direction]);

  function handleChangePage(event, value) {
    dispatch(setPage(value));
  }
  function handleChangeRowsPerPage(event) {
    dispatch(setRowsPerPage(event.target.value));
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <div className="flex justify-start items-left w-full m-12">
          <IconButton onClick={handleClose}>
            <CloseRoundedIcon style={{ color: '#023E73' }} />
          </IconButton>
          <p className="text-black font-bold text-16 mt-8 ml-10">
            Seleccione el usuario que tendrá el rol de {selectRoles(form.cu_id_rol)}
          </p>
        </div>
        <TablePagination
          labelRowsPerPage="mostrar registros"
          style={{ borderRadius: 0 }}
          className="flex-shrink-0 bg-white"
          component="div"
          count={totalRedux}
          rowsPerPage={rowsPerPageRedux}
          page={pageRedux}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <FuseScrollbars className="flex-grow overflow-x-auto">
          <TableContainer>
            <Table
              stickyHeader
              className="min-w-xl"
              aria-labelledby="tableTitle"
              size="small"
              sx={{ minWidth: 900 }}
            >
              <TableHead>
                <TableRow className="h-30 sm:h-64">
                  {rows.map((row) => {
                    return (
                      <TableCell
                        key={row.id}
                        align="left"
                        className={clsx('px-16 py-4 text-11', classes.orderArrow)}
                      >
                        <p className="text-primary font-bold text-16">{row.label}</p>
                      </TableCell>
                    );
                  }, this)}
                </TableRow>
              </TableHead>

              <TableBody>
                {itemUsers.map((n, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow className="cursor-pointer" tabIndex={-1} key={n.cu_id_usuario}>
                      <TableCell
                        className="px-16 py-4 text-11 w-10"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        <FormControlLabel
                          control={
                            <Radio
                              color="primary"
                              checked={Number(selected) === Number(n.cu_id_usuario)}
                              onChange={handleClick(n)}
                              value={n.cu_id_usuario}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          }
                          label={n?.fk_roles?.rol_cliente?.rc_nombre}
                        />
                      </TableCell>

                      <TableCell
                        className="px-16 py-4 text-11 w-10"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {n?.cu_nombres} {n?.cu_apellidos}
                      </TableCell>
                      <TableCell
                        className="px-16 py-4 text-11 w-10"
                        component="th"
                        scope="row"
                        align="left"
                      >
                        {n?.cu_email}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </FuseScrollbars>
      </Paper>
    </Box>
  );
};

export default TableUserSelect;
