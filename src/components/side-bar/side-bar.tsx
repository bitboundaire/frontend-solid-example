import React from "react";
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { AccessTime, Explore, History, Home, Subscriptions, ThumbUp, VideoLibrary } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 260;

const SideBar = () => {
  const navigate = useNavigate();

  return (
      <Drawer
          variant="permanent"
          sx={{
            width: DRAWER_WIDTH,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: 'border-box' },
          }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List dense>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemIcon>
                <Home />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Explore />
              </ListItemIcon>
              <ListItemText primary="Explore" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Subscriptions />
              </ListItemIcon>
              <ListItemText primary="Subscriptions" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <List dense>
              <ListItem button>
                <ListItemIcon>
                  <VideoLibrary />
                </ListItemIcon>
                <ListItemText primary="Library" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <History />
                </ListItemIcon>
                <ListItemText primary="History" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <AccessTime />
                </ListItemIcon>
                <ListItemText primary="Watch Later" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ThumbUp />
                </ListItemIcon>
                <ListItemText primary="Liked Videos" />
              </ListItem>
            </List>
          </List>
        </Box>
      </Drawer>
  );
};

export { SideBar };
