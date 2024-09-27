const BoxIcon = ({ width, height, fill, ...props }) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill='none'
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3.99997H5C3.89543 3.99997 3 4.8954 3 5.99997C3 7.10454 3.89543 7.99997 5 7.99997H19C20.1046 7.99997 21 7.10454 21 5.99997C21 4.8954 20.1046 3.99997 19 3.99997Z"
        stroke="#023E73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8.00003V18C5 18.5305 5.21071 19.0392 5.58579 19.4142C5.96086 19.7893 6.46957 20 7 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0392 19 18.5305 19 18V8.00003"
        stroke="#023E73"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12H14"
        stroke="#023E73"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BoxIcon;
