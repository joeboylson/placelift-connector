import "./index.css";
import { Box, Modal } from "@mui/material";
import MessagesFeed from "../MessagesFeed";
import { ChatCircle } from "@phosphor-icons/react";
import MinimalButton from "../MinimalButton";
import { useToggle } from "../../hooks/useToggle";
import { modalStyle } from "../../constants/muiModal";

interface _props {
  userId: number;
}

export default function MessagesFeedModalWithButton({ userId }: _props) {
  const { value: open, toggle } = useToggle();

  return (
    <>
      <MinimalButton onClick={toggle}>
        <ChatCircle size={24} weight="duotone" />
      </MinimalButton>

      {open && (
        <Modal open={open} onClose={toggle}>
          <Box sx={modalStyle}>
            <div className="components-messagesfeedmodal-messageswrapper">
              <MessagesFeed overrideUserId={userId} />
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}
