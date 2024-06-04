import "./index.css";
import { Chip, Stack, Typography } from "@mui/material";
import { RequestWithRelations } from "../../types";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NumbersIcon from "@mui/icons-material/Numbers";

interface BasicRequestInfoProps {
  request: RequestWithRelations;
}

export default function BasicRequestInfo({ request }: BasicRequestInfoProps) {
  return (
    <div className="components-basicrequestinfo">
      <Typography variant="body2">
        {request.description || "[no description]"}
      </Typography>

      <Typography variant="body2"></Typography>

      <Stack direction="row" useFlexGap flexWrap="wrap" gap={"8px"}>
        <Chip size="small" label={request.id} icon={<NumbersIcon />} />
        <Chip size="small" label={request.room_type.name} variant="outlined" />
        <Chip
          size="small"
          label={`${new Date(request.created_at).toLocaleDateString()}`}
          icon={<AccessTimeIcon />}
          variant="outlined"
        />
      </Stack>

      <Stack direction="row" useFlexGap flexWrap="wrap" gap={"8px"}>
        <Chip size="small" label={request.status_type.name} color="warning" />
      </Stack>

      <Stack direction="row" useFlexGap flexWrap="wrap" gap={"8px"}>
        {request.update_types.map((i) => (
          <Chip size="small" label={i.name} color="primary" />
        ))}
      </Stack>
    </div>
  );
}
