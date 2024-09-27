import clsx from 'clsx';

import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import {
  getListUsers,
  setPage,
  setRowsPerPage
} from '../store/userListSlice';

const rows = [
  {
    id: 'actions',
    align: 'center',
    disablePadding: true,
    label: '',
    sort: false,
  },
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID',
    sort: true,
  },
  {
    id: 'create_reg',
    align: 'left',
    disablePadding: false,
    label: 'Fecha de registro',
    sort: true,
  },
  {
    id: 'rol',
    align: 'left',
    disablePadding: true,
    label: 'ROL',
    sort: true,
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Nombre Usuario',
    sort: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Correo electronico',
    sort: true,
  },
  {
    id: 'document',
    align: 'left',
    disablePadding: false,
    label: 'Documento',
    sort: true,
  },
  {
    id: 'phone',
    align: 'left',
    disablePadding: false,
    label: 'Celular',
    sort: true,
  },
  {
    id: 'actual_state',
    align: 'left',
    disablePadding: false,
    label: 'Estado Actual',
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
      height: 24,
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

const TablaUs = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const dataUsers = useSelector(({ listUserApp }) => listUserApp.userList.listUsers);
  // --------------------------------------------------------------
  const pageRedux = useSelector(({ listUserApp }) => listUserApp.userList.page);
  const rowsPerPageRedux = useSelector(({ listUserApp }) => listUserApp.userList.rowsPerPage);
  const totalRedux = useSelector(({ listUserApp }) => listUserApp.userList.totalRows);
  const loadingRedux = useSelector(({ listUserApp }) => listUserApp.userList.loading);
  // --------------------------------------------------------------
  const [order, setOrder] = useState({
    direction: 'desc',
    id: 'cu_id',
  });
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [placement, setPlacement] = useState();
  const [itemUsers, setItemUsers] = useState([]);
  const [userSelected, setSserSelected] = useState();
  const [formFilter, setFormFilter] = useState({
    id: '',
    create_reg: '',
    rol: '',
    name: '',
    email: '',
    document: '',
    phone: '',
    actual_state: '',
  });

  const [actionRequest, setActionRequest] = useState({
    actual_state: false,
  });

  const stateOption = [
    { value: '', label: '- seleccione -' },
    { value: 1, label: 'Activo' },
    { value: 0, label: 'Inactivo' },
  ];
  // --------------------------------------------------------------
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

  useEffect(() => {
    if (dataUsers?.length > 0) {
      console.log('users', dataUsers);
      setItemUsers(dataUsers);
    } else {
      setItemUsers([]);
    }
  }, [dataUsers]);

  useEffect(() => {
    if (actionRequest.actual_state) {
      handledEnter('state');
    }
  }, [actionRequest]);

  // --------------------------------------------------------------
  const handleClose = (type) => () => {
    if (type === 'edit') {
      history.push(`/usuario/${placement}/${userSelected.cu_id_usuario}`);
    }
    setOpen(false);
  };

  // --------------------------------------------------------------

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({ direction, id });
  }

  function handleChangePage(event, value) {
    dispatch(setPage(value));
  }
  function handleChangeRowsPerPage(event) {
    dispatch(setRowsPerPage(event.target.value));
  }

  // --------------------------------------------------------------
  const handledChangeFilter = (prop) => async (event) => {
    setActionRequest({ ...actionRequest, [prop]: true });
    setFormFilter({ ...formFilter, [prop]: event.target.value });
    await dispatch(setPage(0));
    await dispatch(
      getListUsers(0, rowsPerPageRedux, order.id, order.direction, {
        cu_id: formFilter.id,
        cu_fecha_creacion:
          formFilter.create_reg === '' ? '' : format(new Date(formFilter.create_reg), 'yyyy-MM-dd'),
        rc_nombre: formFilter.rol,
        cu_nombres: formFilter.name,
        cu_email: formFilter.email,
        cu_documento: formFilter.document,
        cu_celular: formFilter.phone,
        cu_estado: formFilter.actual_state,
      })
    );
    setActionRequest({
      state: false,
    });
  };

  const handledChangeDate = async (event) => {
    setFormFilter({ ...formFilter, create_reg: event });
    await dispatch(setPage(0));
    await dispatch(
      getListUsers(0, rowsPerPageRedux, order.id, order.direction, {
        cu_id: formFilter.id,
        cu_fecha_creacion:
          formFilter.create_reg === '' ? '' : format(new Date(formFilter.create_reg), 'yyyy-MM-dd'),
        rc_nombre: formFilter.rol,
        cu_nombres: formFilter.name,
        cu_email: formFilter.email,
        cu_documento: formFilter.document,
        cu_celular: formFilter.phone,
        cu_estado: formFilter.actual_state,
      })
    );
    setActionRequest({
      state: false,
    });
  };

  const handleClick = (newPlacement, user) => async (event) => {
    setSserSelected(user);
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const changeNumber = (prop) => async (event) => {
    if (event.target.value.length === 0) {
      setFormFilter({ ...formFilter, [prop]: event.target.value });
    } else {
      const t = parseInt(event.target.value, 10);
      if (!Number.isNaN(t)) {
        setFormFilter({ ...formFilter, [prop]: t.toString() });
      } else {
        setFormFilter({ ...formFilter, [prop]: '' });
      }
    }
    await dispatch(setPage(0));
    await dispatch(
      getListUsers(0, rowsPerPageRedux, order.id, order.direction, {
        cu_id: formFilter.id,
        cu_fecha_creacion:
          formFilter.create_reg === '' ? '' : format(new Date(formFilter.create_reg), 'yyyy-MM-dd'),
        rc_nombre: formFilter.rol,
        cu_nombres: formFilter.name,
        cu_email: formFilter.email,
        cu_documento: formFilter.document,
        cu_celular: formFilter.phone,
        cu_estado: formFilter.actual_state,
      })
    );
    setActionRequest({
      state: false,
    });
  };
  // --------------------------------------------------------------
  const handledEnter = async (event) => {
    if (event.key === 'Enter' || event === 'create_reg' || event === 'state') {
      await dispatch(setPage(0));
      await dispatch(
        getListUsers(0, rowsPerPageRedux, order.id, order.direction, {
          cu_id: formFilter.id,
          cu_fecha_creacion:
            formFilter.create_reg === ''
              ? ''
              : format(new Date(formFilter.create_reg), 'yyyy-MM-dd'),
          rc_nombre: formFilter.rol,
          cu_nombres: formFilter.name,
          cu_email: formFilter.email,
          cu_documento: formFilter.document,
          cu_celular: formFilter.phone,
          cu_estado: formFilter.actual_state,
        })
      );
      setActionRequest({
        state: false,
      });
    }
  };
  // --------------------------------------------------------------

  return (
    <div className="w-full p-24">
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
        <Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
          <TableHead>
            <TableRow className="h-48 sm:h-64">
              {rows.map((row) => {
                return (
                  <TableCell
                    key={row.id}
                    align="left"
                    className={clsx('px-16 py-4 text-11 font-semibold', classes.orderArrow)}
                  >
                    <p className="text-primary font-bold text-14">{row.label}</p>
                  </TableCell>
                );
              }, this)}
            </TableRow>
            {/* <TableRow className="h-48 sm:h-64">
              {rows.map((row) => {
                const getStyleWidth = () => {
                  switch (row.id) {
                    case 'id':
                      return 50;
                    case 'create_reg':
                      return 110;
                    case 'rol':
                      return 160;
                    case 'name':
                      return 170;
                    case 'email':
                      return 160;
                    case 'document':
                      return 75;
                    case 'phone':
                      return 100;
                    default:
                      return 60;
                  }
                };

                return (
                  <TableCell
                    key={row.id}
                    align="left"
                    style={{
                      background: '#F5FBFF',
                      maxWidth: getStyleWidth(),
                      width: getStyleWidth(),
                    }}
                    className={clsx('px-16 py-4 text-11', classes.headFilters)}
                  >
                    {row.id === 'id' && (
                      <TextField
                        className={classes.textField}
                        style={{ maxWidth: 48 }}
                        value={formFilter.id}
                        id="id"
                        name="id"
                        onChange={changeNumber('id')}
                        onKeyPress={handledEnter}
                      />
                    )}
                    {row.id === 'create_reg' && (
                      <LocalizationProvider dateAdapter={AdapterDateFns} locale={esLocale}>
                        <MobileDatePicker
                          showToolbar={false}
                          className={classes.textField}
                          // onKeyPress={handledEnter}
                          value={formFilter.create_reg}
                          onChange={handledChangeDate}
                          maxDate={new Date()}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              style={{ maxWidth: 160 }}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <CalendarIcon fill="#D1E3F5" width="18" height="18" />
                                  </InputAdornment>
                                ),
                              }}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    )}
                    {row.id === 'rol' && (
                      <TextField
                        value={formFilter.rol}
                        style={{ minWidth: 96 }}
                        className={classes.textField}
                        onChange={handledChangeFilter('rol')}
                        onKeyPress={handledEnter}
                      />
                    )}
                    {row.id === 'name' && (
                      <TextField
                        value={formFilter.name}
                        style={{ minWidth: 96 }}
                        className={classes.textField}
                        onChange={handledChangeFilter('name')}
                        onKeyPress={handledEnter}
                      />
                    )}
                    {row.id === 'email' && (
                      <TextField
                        className={classes.textField}
                        style={{ maxWidth: 270 }}
                        value={formFilter.email}
                        id="email"
                        name="email"
                        onChange={handledChangeFilter('email')}
                        onKeyPress={handledEnter}
                      />
                    )}
                    {row.id === 'document' && (
                      <TextField
                        value={formFilter.document}
                        style={{ minWidth: 96 }}
                        className={classes.textField}
                        onChange={handledChangeFilter('document')}
                        onKeyPress={handledEnter}
                      />
                    )}
                    {row.id === 'phone' && (
                      <TextField
                        className={classes.textField}
                        style={{ maxWidth: 110 }}
                        value={formFilter.phone}
                        id="phone"
                        name="phone"
                        onChange={changeNumber('phone')}
                        onKeyPress={handledEnter}
                      />
                    )}
                    {row.id === 'actual_state' && (
                      <Select
                        className={classes.textField}
                        style={{ maxWidth: 110 }}
                        id="actual_state"
                        name="actual_state"
                        value={formFilter.actual_state}
                        onChange={handledChangeFilter('actual_state')}
                        onKeyPress={handledEnter}
                      >
                        {stateOption.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </TableCell>
                );
              }, this)}
            </TableRow> */}
          </TableHead>
          {/* ---------- ******************** ---------- ******************** ---------- ******************** ---------- */}
          <TableBody className="font-sans">
            {itemUsers.map((n) => {
              return (
                <TableRow className="cursor-pointer" tabIndex={-1} key={n.cu_id}>
                  <Popper open={open} anchorEl={anchorEl} transition>
                    {({ TransitionProps, placement2 }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin: placement2 === 'bottom' ? 'center top' : 'center bottom',
                        }}
                      >
                        <Paper id="menu-list-grow">
                          <ClickAwayListener onClickAway={handleClose('')}>
                            <MenuList>
                              <MenuItem onClick={handleClose('edit')}>Editar</MenuItem>
                              {/* <MenuItem onClick={handleClose}>Activar / Inactivar</MenuItem> */}
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>

                  <TableCell className="text-center" padding="none">
                    <IconButton
                      aria-owns="selectedProductsMenu"
                      aria-haspopup="true"
                      onClick={handleClick(n.cu_id, n)}
                      size="large"
                    >
                      <MoreHorizRoundedIcon style={{ color: '#145C9C' }} />
                    </IconButton>
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {n.cu_id}
                  </TableCell>

                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {`${format(new Date(n.cu_fecha_creacion), 'yyyy-MM-dd')}`}
                    <br />
                    {`${format(new Date(n.cu_fecha_creacion), '(hh:mm a)')}`}
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="left"
                    //style={{ width: 50, maxWidth: 50 }}
                  >
                    {n.fk_roles?.rol_cliente?.rc_nombre}
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {n.cu_nombres} {n.cu_apellidos}
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {n.cu_email}
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {n.cu_documento}
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="left"
                  >
                    {n.cu_celular.slice(2)}
                  </TableCell>
                  <TableCell
                    className="px-16 py-4 text-11 font-semibold"
                    component="th"
                    scope="row"
                    align="center"
                  >
                    {n.cu_estado === 1 ? (
                      <div
                        className="rounded-16 p-8 w-full flex justify-center items-center"
                        style={{ backgroundColor: '#D0E9FF' }}
                      >
                        <Typography className="font-semibold" style={{ color: '#2E7EC5' }}>
                          Activo
                        </Typography>
                      </div>
                    ) : (
                      <div
                        className="rounded-16 p-8 w-full flex justify-center items-center"
                        style={{ backgroundColor: '#FFEDED' }}
                      >
                        <Typography className="font-semibold" style={{ color: '#FF4D4D' }}>
                          Inactivo
                        </Typography>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </FuseScrollbars>
    </div>
  );
};

export default TablaUs;
