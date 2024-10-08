import { Divider } from '@mui/material';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import FuseNavItem from '../FuseNavItem';

const StyledList = styled(List)(({ theme }) => ({
  '& .fuse-list-item': {
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)',
    },
    '&:focus:not(.active)': {
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)',
    },
  },
  '&.active-square-list': {
    '& .fuse-list-item, & .active.fuse-list-item': {
      width: '100%',
      borderRadius: '0',
    },
  },
  '&.dense': {
    '& .fuse-list-item': {
      paddingTop: 0,
      paddingBottom: 0,
      height: 32,
    },
  },
}));

function FuseNavVerticalLayout1(props) {
  const { navigation, layout, active, dense, className, onItemClick } = props;
  const dispatch = useDispatch();

  function handleItemClick(item) {
    onItemClick?.(item);
  }

  return (
    <>
      <div className="text-primaryBlack mb-16 mt-32 text-14 px-20 font-semibold">
        MENÚ
        <Divider style={{ background: '#BDD7EF' }} className="my-10" />
      </div>
      <StyledList
        className={clsx(
          'navigation whitespace-nowrap px-12',
          `active-${active}-list`,
          dense && 'dense',
          className
        )}
      >
        {navigation.map((_item) => (
          <FuseNavItem
            key={_item.id}
            type={`vertical-${_item.type}`}
            item={_item}
            nestedLevel={0}
            onItemClick={handleItemClick}
          />
        ))}
      </StyledList>
    </>
  );
}

export default FuseNavVerticalLayout1;
