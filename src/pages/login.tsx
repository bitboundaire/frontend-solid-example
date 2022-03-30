import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useUserContext } from "../hooks/use-user-context";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const login = () => {
    setUser({
      name,
      email,
      id: String(Math.random() * 32323)
    });

    navigate("/");
  };

  return (
      <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Paper sx={{ padding: 4 }} variant="outlined">
          <TextField label="Name" fullWidth value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Email" fullWidth sx={{ marginTop: 2 }} value={email} onChange={e => setEmail(e.target.value)} />
          <Button disabled={!name || !email} onClick={login} fullWidth variant="contained" disableElevation sx={{ marginTop: 2 }}>
            Login
          </Button>
        </Paper>
      </Box>
  );
};

export { LoginPage };
