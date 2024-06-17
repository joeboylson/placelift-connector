import { Chip, ChipOwnProps, Stack } from "@mui/material";
import { chipStackProps } from "../../constants/muiStack";

interface _props {
  chipProps: ChipOwnProps[];
}

export default function ChipStack({ chipProps }: _props) {
  return (
    <Stack {...chipStackProps}>
      {chipProps.map((i, index) => (
        <Chip {...i} key={`${index}-${i.label}`} />
      ))}
    </Stack>
  );
}
