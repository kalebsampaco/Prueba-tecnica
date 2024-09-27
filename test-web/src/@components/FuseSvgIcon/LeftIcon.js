const LeftIcon = ({ width, height, fill, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.5 11L1.5 6L6.5 1"
        stroke="#B2DBFF"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default LeftIcon;
