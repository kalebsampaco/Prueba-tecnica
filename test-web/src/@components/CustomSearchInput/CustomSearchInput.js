import { SearchIcon } from '@components/FuseSvgIcon';
import { Typography } from '@mui/material';

export default function CustomSearchInput({ label, value, onChange, onKeyPress, labelBottom }) {
  return (
    <div className="flex flex-row flex-wrap gap-6 h-48 focus:border-primaryLight w-320 items-center px-9 py-10 bg-primaryLight rounded-4">
      <SearchIcon width={14} height={14} />
      <input
        className="bg-primaryLight h-full w-11/12 "
        placeholder={label}
        type="search"
        value={value}
        onChange={onChange}
        style={{
          outline: 'none',
        }}
        onKeyPress={onKeyPress}
      />
      {labelBottom && value?.length > 0 && (
        <Typography className="text-12 text-inActive mt-7">{labelBottom}</Typography>
      )}
    </div>
  );
}
