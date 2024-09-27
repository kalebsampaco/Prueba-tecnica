const EditIcon = ({ width, height, fill, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 20H8.17525L19.1353 9.03997C19.689 8.4863 20 7.73536 20 6.95235C20 6.16934 19.689 5.4184 19.1353 4.86472C18.5816 4.31105 17.8307 4 17.0477 4C16.2646 4 15.5137 4.31105 14.96 4.86472L4 15.8248V20Z"
        stroke="#023E73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 8.33331L15.6667 11"
        stroke="#023E73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default EditIcon;

EditIcon.defaultProps = {
    width: 24,
    height: 24,
    fill: "#023E73",
  };
  