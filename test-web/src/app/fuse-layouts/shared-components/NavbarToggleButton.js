import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultSettings } from 'app/store/fuse/settingsSlice';
import _ from '@lodash';
import { navbarToggleMobile, navbarToggle } from '../../store/fuse/navbarSlice';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { CloseWithOutRoundIcon } from '@components/FuseSvgIcon';

function NavbarToggleButton(props) {
  const { navbar, className } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('lg'));
  const settings = useSelector(({ fuse }) => fuse.settings.current);
  const { config } = settings.layout;

  return (
    <IconButton
      className={className}
      color="inherit"
      size="small"
      onClick={(ev) => {
        if (mdDown) {
          dispatch(navbarToggleMobile());
        } else if (config.navbar.style === 'style-2') {
          dispatch(
            setDefaultSettings(
              _.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
            )
          );
        } else {
          dispatch(navbarToggle());
        }
      }}
    >
      {navbar && navbar.mobileOpen === false ? (
        <MenuRoundedIcon fontSize="inherit" className="text-16 text-primary" />
      ) : (
        <CloseWithOutRoundIcon width={16} height={16} />
      )}
    </IconButton>
  );
}

export default NavbarToggleButton;
