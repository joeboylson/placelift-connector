import { Box, Modal } from "@mui/material";
import { useToggle } from "./useToggle";
import { modalStyle } from "../constants/muiModal";
import { useCallback } from "react";
import ConfirmationCard from "../components/ConfirmationCard";

export function useConfirmationModal(onConfirm: () => void, title: string) {
  const { value: open, toggle } = useToggle();

  const handleConfirm = useCallback(() => {
    onConfirm();
    toggle();
  }, [onConfirm]);

  function ConfirmationModal() {
    if (!open) return null;
    return (
      <Modal open={open} onClose={toggle}>
        <Box sx={modalStyle}>
          <ConfirmationCard
            title={title}
            onCancel={toggle}
            onConfirm={handleConfirm}
          />
        </Box>
      </Modal>
    );
  }

  return {
    handleConfirm: toggle,
    ConfirmationModal,
  };
}
