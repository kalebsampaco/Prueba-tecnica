import { lazy } from 'react';

const UsuariosConfig = {
  settings: {
    layout: {
      config: {
        footer: {
          display: false,
        },
      },
    },
  },
  routes: [
    {
      path: '/usuarios',
      component: lazy(() => import('./tablaUsuarios')),
    },
    {
      path: '/usuario/:id/:idUser',
      component: lazy(() => import('./EditUser/EditUser')),
    },
    /* {
      path: '/usuario/:id',
      component: lazy(() => import('./EditUser/EditUser')),
    }, */
    {
      path: '/registro/usuario',
      component: lazy(() => import('./CreateUser/CreateUser')),
    },
  ],
};

export default UsuariosConfig;
