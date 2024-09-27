import { IconButton, Typography } from "@mui/material";
import { DownloadIcon, CloseIcon } from "@components/FuseSvgIcon";

export default function CustomItemDownload({ data, downloadFile, deleteFile }) {
  return (
    <div className="flex flex-wrap gap-4 bg-primaryLight rounded-4 items-center p-4">
      <Typography className=" font-semibold text-darkPrimary">{data?.name}</Typography>
      <IconButton onClick={downloadFile(data)}>
        <DownloadIcon width={12} height={12} />
      </IconButton>
      <IconButton onClick={deleteFile(data)}>
        <CloseIcon width={12} height={12} />
      </IconButton>
    </div>
  );
}
