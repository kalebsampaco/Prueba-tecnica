import {
  HomeIcon,
  UserIcon
} from '@components/FuseSvgIcon';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);
const navigationConfig = [
  {
    id: 'inicio',
    title: 'Inicio',
    translate: 'Inicio',
    type: 'item',
    icon: <HomeIcon />,
    url: '/dashboard',
    // auth: [...authRoles.onlyGuest, ...authRoles.onlyGuest],
  },
  {
    id: 'user-cop',
    title: 'Usuarios',
    // translate: 'Tramites',
    type: 'item',
    icon: <UserIcon />,
    url: '/usuarios',
    // auth: authRoles.onlyGuest,
  },
];

export default navigationConfig;
