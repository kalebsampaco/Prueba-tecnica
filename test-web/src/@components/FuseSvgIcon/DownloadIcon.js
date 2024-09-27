const DownloadIcon = ({ width, height, fill, ...props }) => {
  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9996 16.2C20.7841 15.6572 21.3757 14.8791 21.6891 13.9781C22.0026 13.0771 22.0216 12.0998 21.7434 11.1873C21.4652 10.2748 20.9042 9.47429 20.1414 8.9014C19.3786 8.32851 18.4535 8.01285 17.4996 7.99999H15.6996C15.3973 6.98027 14.8667 6.04283 14.1479 5.25888C13.4291 4.47493 12.5412 3.86507 11.5514 3.47562C10.5617 3.08617 9.49627 2.92738 8.436 3.01129C7.37573 3.09521 6.34852 3.41963 5.43239 3.95991C4.51625 4.5002 3.73528 5.24214 3.14878 6.1294C2.56227 7.01666 2.18567 8.0259 2.04755 9.08048C1.90944 10.1351 2.01345 11.2072 2.35169 12.2156C2.68993 13.224 3.25351 14.142 3.99961 14.9"
        stroke="#023E73"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 12V21"
        stroke="#023E73"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 17L12 21L16 17"
        stroke="#023E73"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default DownloadIcon;
