import { Breadcrumbs } from '@mui/material';
import { Link } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function CustomBreadcrumb({ navigations, mainColor }) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
      {navigations.map((navigation, index) => {
        if (navigation.link) {
          return (
            <Link
              key={index + navigation.title}
              to={navigation.link}
              style={{
                color: navigations.color ? navigations.color : mainColor,
              }}
            >
              {navigation.title}
            </Link>
          );
        }
        return (
          <p
            key={index + navigation.title}
            style={{ color: navigations.color ? navigations.color : mainColor }}
          >
            {navigation.title}
          </p>
        );
      })}
    </Breadcrumbs>
  );
}
CustomBreadcrumb.defaultProps = {
  navigations: [],
  mainColor: '#023E73',
};
