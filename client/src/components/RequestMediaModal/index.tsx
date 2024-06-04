import "./index.css";
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { getIsMediaVideo } from "../../utils/media";
import { RequestWithRelations } from "../../types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

interface RequestMediaModalProps {
  request: RequestWithRelations;
}

export default function RequestMediaModal({ request }: RequestMediaModalProps) {
  const [open, setOpen] = useState(false);

  const media = useMemo(
    () => [...(request.images ?? []), ...(request.videos ?? [])],
    [request]
  );

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        View {media.length} Images & Videos
      </Button>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open && media.length === 0}
        onClose={handleClose}
        key={request.id}
        message="No Images are Videos Uploaded"
      />

      <Modal open={open && media.length > 0} onClose={handleClose}>
        <Box sx={style}>
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
    </div>
  );
}
