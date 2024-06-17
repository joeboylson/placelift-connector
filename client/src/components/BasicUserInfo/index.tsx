import "./index.css";
import { ChipOwnProps, Typography } from "@mui/material";
import { Tables } from "@shared/types";
import NumbersIcon from "@mui/icons-material/Numbers";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { compact } from "lodash";
import { useMemo } from "react";
import ChipStack from "../ChipStack";
import SpacedGrid8px from "../SpacedList8px";

interface _props {
  user: Tables<"users">;
}

export default function BasicUserInfo({ user }: _props) {
  const chipProps = useMemo(() => {
    const { email, phone_number } = user;
    const _c = { size: "small" };
    const _createdDate = new Date(user.created_at).toLocaleDateString();

    const emailChip = { ..._c, label: email };
    const phoneNumberChip = { ..._c, label: phone_number, icon: <PhoneIcon /> };

    return compact([
      { ..._c, label: user.id, icon: <NumbersIcon /> },
      { ..._c, label: _createdDate, icon: <AccessTimeIcon /> },
      email && emailChip,
      phone_number && phoneNumberChip,
    ]) as ChipOwnProps[];
  }, [user]);

  return (
    <SpacedGrid8px>
      <Typography variant="body2">{user.name || "[guest]"}</Typography>
      <ChipStack chipProps={chipProps} />
    </SpacedGrid8px>
  );
}
