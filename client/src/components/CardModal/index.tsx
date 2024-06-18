import { Box, Card, CardContent, Modal } from "@mui/material";
import { WithChildren } from "../../types";
import { modalStyle } from "../../constants/muiModal";

type _props = WithChildren & {
  open: boolean;
  handleClose: () => void;
};

export default function CardModal({ children, open, handleClose }: _props) {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Card sx={{ minWidth: 500 }}>
          <CardContent>{children}</CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
