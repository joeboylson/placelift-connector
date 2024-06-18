import "./index.css";
import {
  Box,
  ImageList,
  ImageListItem,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { getIsMediaVideo } from "../../utils/media";
import { UserRequestWithRelations } from "@shared/types";
import MinimalButton from "../MinimalButton";
import { Images } from "@phosphor-icons/react";
import { modalStyle } from "../../constants/muiModal";

interface _props {
  request: UserRequestWithRelations;
}

export default function RequestMediaModalWithButton({ request }: _props) {
  const [open, setOpen] = useState(false);

  const media = useMemo(
    () => [...(request.images ?? []), ...(request.videos ?? [])],
    [request]
  );

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div>
      <MinimalButton onClick={handleOpen}>
        <p>
          {media.length}
          <Images size={24} weight="duotone" />
        </p>
      </MinimalButton>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open && media.length === 0}
        onClose={handleClose}
        key={request.id}
        message="No Images are Videos Uploaded"
      />

      {open && (
        <Modal open={open && media.length > 0} onClose={handleClose}>
          <Box sx={modalStyle}>
            <div className="components-requestmediamodal-mediawrapper">
              <Typography variant="h5">Request Media</Typography>
              <ImageList
                sx={{ width: "80vw", height: "70vh" }}
                cols={3}
                rowHeight={200}
              >
                {media.map((item, _index) => {
                  const isVideo = getIsMediaVideo(item);

                  if (isVideo) {
                    return (
                      <ImageListItem key={_index}>
                        <video controls width="250">
                          <source src={item} type="video/mp4" />
                        </video>
                      </ImageListItem>
                    );
                  }

                  return (
                    <ImageListItem key={_index}>
                      <img src={item} alt={item} loading="lazy" />
                    </ImageListItem>
                  );
                })}
              </ImageList>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
