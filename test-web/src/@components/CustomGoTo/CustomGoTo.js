import { Typography } from '@mui/material';
import { RightArrowIcon } from '@components/FuseSvgIcon';
import { useHistory } from 'react-router-dom';

export default function CustomGoTo({ label, buttonLabel, goToLabel, buttonRef, goToRef }) {
  const history = useHistory();

  return (
    <div className="flex flex-col gap-1 mt-12">
      <Typography className="text-inActive text-xs font-semibold leading-4">{label}</Typography>
      <button
        type="button"
        className="hover:bg-primaryLight rounded-6 px-5 py-3 flex  flex-wrap gap-5 text-primary font-semibold  text-base"
        onClick={() => history.push(buttonRef)}
      >
        {buttonLabel}
        <RightArrowIcon width={24} height={24} fill="none" />
      </button>
      {goToRef && (
        <button
          onClick={() => history.push(goToRef)}
          type="button"
          className=" text-primary underline font-semibold text-base"
        >
          {goToLabel}
        </button>
      )}
    </div>
  );
}

CustomGoTo.defaultProps = {
  label: 'Clic para ver expediente digital',
  buttonLabel: '',
  goToLabel: 'Ir a Comunicaciones',
  buttonRef: '/',
};
