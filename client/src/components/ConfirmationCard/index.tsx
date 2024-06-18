import { Box, Button, Card, Divider, Stack, Typography } from "@mui/material";
import { PossiblyWithChildren } from "../../types";

type _props = PossiblyWithChildren & {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmationCard({
  children,
  title,
  onConfirm,
  onCancel,
}: _props) {
  return (
    <Card variant="outlined" sx={{ minWidth: 400 }}>
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {children}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <Button
            onClick={onCancel}
            variant="outlined"
            size="small"
            color="primary"
          >
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            variant="contained"
            size="small"
            color="primary"
          >
            Confirm
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
