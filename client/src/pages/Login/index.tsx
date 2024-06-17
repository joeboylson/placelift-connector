import "./index.css";
import { useCallback, useState } from "react";
import { useOTPLogin } from "../../hooks/useOTPLogin";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, TextField } from "@mui/material";
import SpacedGrid8px from "../../components/SpacedList8px";

export default function Login() {
  const navigate = useNavigate();
  const { sendOTPToEmailAddress, verifyOTP } = useOTPLogin();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [otp, setOTP] = useState<string>();
  const [otpEmailSent, setOTPEmailSent] = useState<boolean>(false);

  const handleSendOTP = useCallback(async () => {
    try {
      setLoading(true);
      if (!email) return;
      const success = await sendOTPToEmailAddress(email);
      if (success) setOTPEmailSent(true);
    } finally {
      setLoading(false);
    }
  }, [email, sendOTPToEmailAddress]);

  const handleVerifyOTP = useCallback(async () => {
    try {
      setLoading(true);
      if (!email) return;
      if (!otp) return;
      const success = await verifyOTP(email, otp);
      if (success) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  }, [email, otp, verifyOTP, navigate]);

  return (
    <div id="pages-login">
      <Card>
        <CardContent>
          <SpacedGrid8px>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              onChange={(i) => setEmail(i.target.value)}
              disabled={otpEmailSent}
            />

            {otpEmailSent && (
              <>
                <TextField
                  id="outlined-basic"
                  label="OTP"
                  variant="outlined"
                  type="text"
                  onChange={(i) => setOTP(i.target.value)}
                />
                <Button
                  variant="contained"
                  onClick={handleVerifyOTP}
                  disabled={loading}
                >
                  Verify OTP
                </Button>
              </>
            )}
            {!otpEmailSent && (
              <>
                <Button
                  variant="contained"
                  onClick={handleSendOTP}
                  disabled={loading}
                >
                  Send OTP
                </Button>
              </>
            )}
          </SpacedGrid8px>
        </CardContent>
      </Card>
    </div>
  );
}
