const ImgExtensionIcon = ({ width, height, fill, ...props }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      {...props}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
        fill="#FF4D4D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.129 18.5L13.4998 10L9.60165 15.6358L8.49984 14L5.46875 18.5H7.62049H11.5309H19.129Z"
        fill="white"
      />
    </svg>
  );
};
export default ImgExtensionIcon;

ImgExtensionIcon.defaultProps = {
  width: 24,
  height: 24,
  fill: '#FF4D4D',
};
