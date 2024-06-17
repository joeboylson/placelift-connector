import "./index.css";
import { Box, Button, Modal } from "@mui/material";
import { useCallback, useState } from "react";
import MessagesFeed from "../MessagesFeed";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

interface _props {
  userId: number;
}

export default function MessagesFeedModalWithButton({ userId }: _props) {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <div className="components-messagesfeedmodal">
      <Button onClick={handleOpen} variant="contained" size="small">
        View Messages
      </Button>

      {open && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <div className="components-messagesfeedmodal-messageswrapper">
              <MessagesFeed overrideUserId={userId} />
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}
