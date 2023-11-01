import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import AppleIcon from "@mui/icons-material/Apple";
import MailIcon from "@material-ui/icons/Mail";
import DevicesIcon from "@mui/icons-material/Devices";
import TypeSpecimenIcon from "@mui/icons-material/TypeSpecimen";
import { Container } from "@mui/material";
import { useStyles } from "../adminStyle/adminHomeStyle";
import {
  CREATEBRAND_ROUTE,
  CREATETYPE_ROUTE,
  CREATEDEVICE_ROUTE,
  ADMINDEVICE_ROUTE,
  ADMINORDER_ROUTE,
} from "../../../utils/consts";
import { useDispatch } from "react-redux";
import { logout, checkIsAuth } from "../../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import "../adminStyle/index.css";
export default function MiniDrawer() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Вы вышли из системы");
    window.location.reload();
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Административная часть интернет-магазина Mshop
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>
          <Divider />
          <Link to={CREATETYPE_ROUTE}>
            <ListItem button>
              <ListItemIcon>
                <TypeSpecimenIcon />
              </ListItemIcon>

              <ListItemText>Создание типа</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <Link to={CREATEBRAND_ROUTE}>
            <ListItem button>
              <ListItemIcon>
                <AppleIcon />
              </ListItemIcon>

              <ListItemText>Создание бренда</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <Link to={CREATEDEVICE_ROUTE}>
            <ListItem button>
              <ListItemIcon>
                <DevicesIcon />
              </ListItemIcon>

              <ListItemText>Создание девайса</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <Link to={ADMINDEVICE_ROUTE}>
            <ListItem button>
              <ListItemIcon>
                <DevicesIcon />
              </ListItemIcon>

              <ListItemText>Устройства</ListItemText>
            </ListItem>
          </Link>
          <Divider />
          <Link to={ADMINORDER_ROUTE}>
            <ListItem button>
              <ListItemIcon>
                <AppleIcon />
              </ListItemIcon>

              <ListItemText>Заказы</ListItemText>
            </ListItem>
          </Link>
          <List>
            <ListItem button>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText onClick={logoutHandler}>Выход</ListItemText>
            </ListItem>
          </List>
        </List>
      </Drawer>
      <Container>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </Container>
    </div>
  );
}
