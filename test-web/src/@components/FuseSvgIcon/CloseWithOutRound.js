const CloseWithOutRoundIcon = ({ width, height, fill, ...props }) => {
  return (
    <svg
      width={width}
      height={width}
      viewBox="0 0 24 24"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18"
        stroke="#023E73"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L18 18"
        stroke="#023E73"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CloseWithOutRoundIcon;

CloseWithOutRoundIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: "#023E73",
};
