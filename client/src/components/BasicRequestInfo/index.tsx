import "./index.css";
import { ChipOwnProps, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import ChipStack from "../ChipStack";
import SpacedGrid8px from "../SpacedList8px";
import SelectStatusModal from "../SelectStatusModal";
import { Tables, UserRequestWithRelations } from "@shared/types";
import { Clock, IdentificationCard } from "@phosphor-icons/react";

interface _props {
  request: UserRequestWithRelations;
  updateRequest: (id: number, data: Partial<Tables<"user_requests">>) => void;
}

export default function BasicRequestInfo({ request, updateRequest }: _props) {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => setOpen(true);

  const handleCloseModal = (selectedStatusId: number) => {
    setOpen(false);
    if (selectedStatusId === request.status_type_id) return;

    updateRequest(request.id, { status_type_id: selectedStatusId });
  };

  const chipProps = useMemo(() => {
    const _c = { size: "small" };
    const _createdDate = new Date(request.created_at).toLocaleDateString();

    return [
      {
        ..._c,
        label: request.id,
        icon: <IdentificationCard size={16} weight="duotone" />,
      },
      { ..._c, label: request.room_type.name },
      {
        ..._c,
        label: _createdDate,
        icon: <Clock size={16} weight="duotone" />,
      },
      {
        ..._c,
        label: request.status_type.name,
        color: "warning",
        onClick: openModal,
      },
    ] as ChipOwnProps[];
  }, [request]);

  const updateTypeChipProps = useMemo(() => {
    return request.update_types.map((i) => {
      return { size: "small", label: i.name, color: "primary" };
    }) as ChipOwnProps[];
  }, [request]);

  return (
    <SpacedGrid8px>
      <Typography variant="body2">
        {request.description || "[no description]"}
      </Typography>

      <ChipStack chipProps={chipProps} />
      <ChipStack chipProps={updateTypeChipProps} />

      {open && (
        <SelectStatusModal
          currentStatusId={request.status_type_id}
          handleClose={handleCloseModal}
          open={open}
        />
      )}
    </SpacedGrid8px>
  );
}
