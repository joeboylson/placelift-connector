import "./index.css";
import { Chip, Stack, Typography } from "@mui/material";
import { Tables } from "../../types/supabase";
import NumbersIcon from "@mui/icons-material/Numbers";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface BasicUserInfoProps {
  user: Tables<"users">;
}

export default function BasicUserInfo({ user }: BasicUserInfoProps) {
  return (
    <div className="components-basicuserinfo">
      <Typography variant="body2">{user.name || "[guest]"}</Typography>

      <Stack direction="row" useFlexGap flexWrap="wrap" gap={"8px"}>
        <Chip size="small" label={user.id} icon={<NumbersIcon />} />

        <Chip
          size="small"
          label={`${new Date(user.created_at).toLocaleDateString()}`}
          icon={<AccessTimeIcon />}
          variant="outlined"
        />

        {user.email && (
          <Chip size="small" label={user.email} variant="outlined" />
        )}

        {user.phone_number && (
          <Chip
            size="small"
            label={user.phone_number}
            variant="outlined"
            icon={<PhoneIcon />}
          />
        )}
      </Stack>
    </div>
  );
}
