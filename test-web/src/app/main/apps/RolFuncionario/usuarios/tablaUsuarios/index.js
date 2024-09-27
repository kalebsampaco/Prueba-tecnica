import { motion } from 'framer-motion';

import FusePageCarded from '@fuse/core/FusePageCarded';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import withReducer from 'app/store/withReducer';

import CustomButton from '@components/CustomButton';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import reducer from '../store';

import TablaUs from './TablaUs';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    backgroundImage: 'url(/assets/images/backgrounds/usuarios-registrados.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
      minHeight: 144,
      height: 144,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
    borderRadius: 0,
  },
  '& .FusePageCarded-contentWrapper': {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const UsuariosTabla = () => {
  const history = useHistory();
  const user = useSelector(({ auth }) => auth.user);

/*   useEffect(() => {
    if (user.fk_roles?.rl_rol !== 'CLI_ADMIN') {
      history.goBack();
    }
  }, [user.fk_roles?.rl_rol, history]); */

  const handleRegister = () => {
    history.push('registro/usuario');
  };

  return (
    <Root
      header={
        <div className="flex flex-1 w-full items-center justify-between px-12">
          <div className="w-full flex items-center justify-between">
            <Typography
              component={motion.span}
              initial={{ x: -20 }}
              animate={{ x: 0, transition: { delay: 0.2 } }}
              delay={300}
              className="hidden sm:flex text-16 md:text-24 mx-12 font-semibold text-primary"
            >
              Usuarios Registrados
            </Typography>
            <CustomButton
              label="Nuevo usuario"
              className="primary"
              height="large"
              onClick={handleRegister}
            />
          </div>
        </div>
      }
      content={<TablaUs />}
      innerScrolls
    />
  );
};

export default withReducer('listUserApp', reducer)(UsuariosTabla);
