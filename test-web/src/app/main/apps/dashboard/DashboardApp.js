import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';

import withReducer from 'app/store/withReducer';
import reducer from './store';
const Root = styled(FusePageSimple)({
  '& .FusePageSimple-header': {},
  '& .FusePageSimple-toolbar': {},
  '& .FusePageSimple-content': {},
  '& .FusePageSimple-sidebarHeader': {},
  '& .FusePageSimple-sidebarContent': {},
});

function Dashboard(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <h4>¡Bienvenido!</h4>
          <h5 className="mt-10">
            vista inicial
          </h5>
        </div>
      }
      content=""
    />
  );
}

export default withReducer('DashboardApp', reducer)(Dashboard);
