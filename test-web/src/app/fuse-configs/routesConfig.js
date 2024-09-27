import FuseUtils from '@fuse/utils';
import { authRoles } from 'app/auth';
import { Redirect } from 'react-router-dom';

import appsConfigs from 'app/main/apps/appsConfigs';

import Error404PageConfig from 'app/main/404/Error404PageConfig';
import ConfirmarEmailCiudadanoConfig from 'app/main/confirmarEmailCiudadano/ConfirmarEmailCiudadanoConfig';
import ConfirmarEmailFuncionarioConfig from 'app/main/confirmarEmailFuncionario/ConfirmarEmailFuncionarioConfig';
import InicioSesionFuncionario from 'app/main/InicioSesionFuncionario/LoginFuncConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import OlvidarContraseñaConfig from 'app/main/olvidarContraseña/OlvidarContraseñaConfig';
import OlvidarContraseñaFuncConfig from 'app/main/olvidarContraseñaFuncionario/OlvidarContraseñaFuncConfig';
import RegisterConfig from 'app/main/registroCiudadanosEmpresas/RegisterConfig';
import RegistroFuncionariosConfig from 'app/main/registroFuncionarios/RegistroFuncionariosConfig';

// import TiposTramites from "app/main/TiposTramites/TiposTramites";
import TiposTramites from 'app/main/cortolima/CortolimaTramites';
import TiposTramitesConfig from 'app/main/TiposTramites/TiposTramitesConfig';

const routeConfigs = [
  ...appsConfigs,
  Error404PageConfig,
  LoginConfig,
  RegisterConfig,
  LogoutConfig,
  RegistroFuncionariosConfig,
  InicioSesionFuncionario,
  OlvidarContraseñaConfig,
  OlvidarContraseñaFuncConfig,
  ConfirmarEmailCiudadanoConfig,
  ConfirmarEmailFuncionarioConfig,
  TiposTramitesConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: '/',
    exact: true,
    auth: authRoles.onlyGuest,
    settings: {
      layout: {
        config: {
          navbar: {
            display: false,
          },
          toolbar: {
            display: false,
          },
          footer: {
            display: false,
          },
          leftSidePanel: {
            display: false,
          },
          rightSidePanel: {
            display: false,
          },
        },
      },
    },
    component: TiposTramites,
    // component: () => <Redirect to="/dashboard" />,
  },
  {
    component: () => <Redirect to="/404" />,
  },
];

export default routes;
