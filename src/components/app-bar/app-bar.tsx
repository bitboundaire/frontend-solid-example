import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
  ExitToApp,
  Feedback,
  ModeNight,
  NotificationsOutlined,
  Paid,
  Translate,
  VideoSettings
} from "@mui/icons-material";
import {
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CardHeader,
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  InputBase, useScrollTrigger
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserContext } from "../../hooks/use-user-context";

const Search = styled('div')(({ theme }) => ({
  width: 400,
  marginLeft: '40px',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',

  '& .MuiInputBase-input': {
    width: '100% !important',
    padding: theme.spacing(1, 2, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const AppBar = () => {
  const searchParams = new URLSearchParams(window.location.search);

  const [search, setSearch] = useState(searchParams.get("q") ?? "");
  const [profileAnchorElement, setProfileAnchorElement] = useState(null);
  const [notificationAnchorElement, setNotificationAnchorElement] = useState(null);

  const navigate = useNavigate();
  const { user } = useUserContext();
  const trigger = useScrollTrigger({
    threshold: 10,
    disableHysteresis: true,
  });

  const isProfileMenuOpen = Boolean(profileAnchorElement);
  const handleProfileMenuClose = () => setProfileAnchorElement(null);
  const handleProfileMenuOpen = (event: any) => setProfileAnchorElement(event.currentTarget);

  const isNotificationMenuOpen = Boolean(notificationAnchorElement);
  const handleNotificationMenuClose = () => setNotificationAnchorElement(null);
  const handleNotificationMenuOpen = (event: any) => setNotificationAnchorElement(event.currentTarget);

  const accountMenu = (
      <Menu
          anchorEl={profileAnchorElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          id='primary-search-account-menu'
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={isProfileMenuOpen}
          onClose={handleProfileMenuClose}
      >
        <Paper elevation={0} sx={{ width: 300, maxWidth: '100%' }}>
          <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
              }
              title={user?.name}
              subheader={user?.email}
          />
          <Divider />
          <MenuList
              onClick={() => {
                navigate("/profile");
                handleProfileMenuClose();
              }}
          >
            <MenuItem>
              <ListItemIcon>
                <AccountCircle fontSize="small" />
              </ListItemIcon>
              <ListItemText>My Account</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Paid fontSize="small" />
              </ListItemIcon>
              <ListItemText>BitTube Studio</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <ExitToApp fontSize="small" />
              </ListItemIcon>
              <ListItemText>Sign Out</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <ModeNight fontSize="small" />
              </ListItemIcon>
              <ListItemText>Theme</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Translate fontSize="small" />
              </ListItemIcon>
              <ListItemText>Language</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <VideoSettings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Feedback fontSize="small" />
              </ListItemIcon>
              <ListItemText>Feedback</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      </Menu>
  );

  const notificationMenu = (
      <Menu
          anchorEl={notificationAnchorElement}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          id='secondary-search-account-menu'
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={isNotificationMenuOpen}
          onClose={handleNotificationMenuClose}
      >
        <Paper elevation={0} sx={{ width: 300, maxWidth: '100%' }}>
          <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {[0, 1, 2, 3, 5].map((value) => {
              return (
                  <ListItem key={value}>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Avatar
                            alt={`Avatar n°${value + 1}`}
                            src={`/static/images/avatar/${value + 1}.jpg`}
                        />
                      </ListItemAvatar>
                      <ListItemText primary={`Video ${value + 1}`} />
                    </ListItemButton>
                  </ListItem>
              );
            })}
          </List>
        </Paper>
      </Menu>
  );

  return (
      <Box sx={{ flexGrow: 1 }}>
        <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} elevation={trigger ? 6 : 0} color="primary">
          <Toolbar>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' }, cursor: 'pointer' }}
                onClick={() => {
                  navigate("/");
                }}
            >
              BitTube
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <form action="" id="form" onSubmit={(event) => {
                event.persist();
                event.preventDefault();

                navigate({
                  pathname: "/search",
                  search: `q=${search}`
                });
              }}>
                <StyledInputBase
                    value={search}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={event => {
                      setSearch(event.target.value);
                    }}
                />
              </form>
            </Search>
            <Box marginLeft="auto" sx={{ display: { xs: 'none', md: 'flex' } }}>
              <IconButton
                  size="large"
                  color="inherit"
                  aria-label="show 5 new notifications"
                  onClick={handleNotificationMenuOpen}
              >
                <Badge badgeContent={5} color="error">
                  <NotificationsOutlined />
                </Badge>
              </IconButton>
              <IconButton
                  size="large"
                  aria-label="account of current user"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
          <Divider />
        </MuiAppBar>
        {accountMenu}
        {notificationMenu}
      </Box>
  );
}
