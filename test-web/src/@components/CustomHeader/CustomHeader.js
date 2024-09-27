import { useHistory } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CustomBreadcrumb from '@components/CustomBreadcrumb';
import CustomIndicator from '@components/CustomIndicator';

export default function CustomHeader({
  backUrl,
  navigations,
  mainColorNavigations,
  indicatorEtapa,
  label,
  title,
  labelStyles,
  titleStyles,
  stageIndicator,
  stageIndicatorType,
}) {
  const history = useHistory();
  return (
    <div
      style={{
        minHeight: 136,
        backgroundColor: '#EEF7FF',
        display: 'flex',
        justifyContent: 'space-between',
        padding: 24,
      }}
    >
      <div className="flex w-full mx-10  justify-between">
        <div className="flex sm:flex-row flex-col items-center ">
          <IconButton
            style={{ backgroundColor: '#023E73', height: 32, width: 32 }}
            onClick={() => {
              window.history.go(-1);
            }}
          >
            <ArrowBackIosRoundedIcon style={{ color: '#4FDFC8', fontSize: 15 }} />
          </IconButton>
          <div className="flex flex-col justify-center mx-12 sm:mb-0 mb-16">
            <p className={labelStyles || 'text-primaryBlack font-semibold text-14 '}>{label}</p>
            <p className={titleStyles || 'text-primary font-semibold text-20'}>{title}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end gap-6 mx-12 sm:mb-0 mb-16">
          <CustomBreadcrumb navigations={navigations} mainColor={mainColorNavigations} />
          <CustomIndicator indicator={stageIndicator} type={stageIndicatorType} />
        </div>
      </div>
    </div>
  );
}
