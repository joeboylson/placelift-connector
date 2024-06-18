import "./index.css";
import {
  Box,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useCallback } from "react";
import { useTypesAPI } from "../../hooks/useTypesAPI";
import { modalStyle } from "../../constants/muiModal";

interface _props {
  currentStatusId: number;
  open: boolean;
  handleClose: (selectedStatusId: number) => void;
}

export default function SelectStatusModal({
  currentStatusId,
  open,
  handleClose,
}: _props) {
  const { types } = useTypesAPI("status_types");

  const handleChange = useCallback(
    (_: unknown, value: string) => {
      handleClose(Number(value));
    },
    [handleClose]
  );

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Card sx={{ minWidth: 500 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Set Request Status
            </Typography>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={currentStatusId}
                onChange={handleChange}
              >
                {types.map((type) => {
                  return (
                    <FormControlLabel
                      key={type.id}
                      value={type.id}
                      control={<Radio />}
                      label={`${type._order}. ${type.name}`}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
