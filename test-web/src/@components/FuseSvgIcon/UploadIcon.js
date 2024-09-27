const UploadIcon = ({ width, height, fill, ...props }) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.00034 14.899C3.25738 14.1399 2.69691 13.2217 2.36137 12.214C2.02584 11.2062 1.92405 10.1353 2.0637 9.08232C2.20335 8.02938 2.5808 7.02202 3.16743 6.13655C3.75407 5.25109 4.53452 4.51074 5.44967 3.97157C6.36482 3.43241 7.39067 3.10857 8.44951 3.0246C9.50835 2.94062 10.5724 3.09871 11.5611 3.48688C12.5498 3.87505 13.4372 4.48313 14.1561 5.26506C14.8749 6.04698 15.4065 6.98225 15.7103 8.00002H17.5003C18.4659 7.99991 19.4058 8.31034 20.1813 8.88546C20.9569 9.46058 21.5269 10.2699 21.8071 11.1938C22.0874 12.1178 22.063 13.1074 21.7377 14.0164C21.4123 14.9254 20.8032 15.7057 20.0003 16.242"
        stroke="#145C9C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12V21"
        stroke="#145C9C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 16L12 12L8 16"
        stroke="#145C9C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default UploadIcon;

UploadIcon.defaultProps = {
  width: 25,
  height: 25,
  fill: '#145C9C',
};
