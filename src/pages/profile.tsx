import * as React from "react";
import { Layout } from "../components/layout";
import { Button, TextField, Typography } from "@mui/material";
import { useUserContext } from "../hooks/use-user-context";

export const ProfilePage = () => {
  const { updateName, updateEmail, setUser, user } = useUserContext();

  if (!user) {
    return null;
  }

  return (
      <Layout>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Olá, {user.name}
        </Typography>
        <TextField label="Name" fullWidth value={user.name} onChange={e => updateName(e.target.value)} />
        <TextField label="Email" fullWidth sx={{ marginTop: 2 }} value={user.email} onChange={e => updateEmail(e.target.value)} />
        <Button sx={{ marginTop: 4 }} variant="contained" disableElevation onClick={() => setUser()}>Sair</Button>
      </Layout>
  );
};
