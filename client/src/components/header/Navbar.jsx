import { React, useContext, useEffect, useState } from "react";

import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./header.css";
import { CustomContext } from "../../utils/context";
import {
  BASKET_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  MYPROFILE_ROUTE,
  MYORDERS_ROUTE,
} from "../../utils/consts";

import { useSelector, useDispatch } from "react-redux";
import { logout, checkIsAuth } from "../../redux/features/auth/authSlice";
import { clearCart, getTotals } from "../../redux/features/cart/cartSlice";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(checkIsAuth);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const cartTotalQuantity = useSelector((state) => state.cart.cartItems.length);
  const cart = useSelector((state) => state.cart);
  const { getUser, setSearchValue } = useContext(CustomContext);

  useEffect(() => {
    dispatch(getTotals());
    dispatch(getUser());
  }, [cart, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());

    window.localStorage.removeItem("token");
    dispatch(clearCart());
    toast("Вы вышли из системы");
    window.location.reload();
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuth ? (
        <div>
          <MenuItem onClick={handleMenuClose}>
            <div onClick={logoutHandler}>Выход</div>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link className="nav-link" to={MYPROFILE_ROUTE}>
              Моя страница
            </Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link className="nav-link" to={MYORDERS_ROUTE}>
              Мои заказаы
            </Link>
          </MenuItem>
        </div>
      ) : (
        <div>
          <Link to={LOGIN_ROUTE}>
            <MenuItem onClick={handleMenuClose}>Вход</MenuItem>
          </Link>
          <Link to={REGISTRATION_ROUTE}>
            {" "}
            <MenuItem onClick={handleMenuClose}>Регистрация</MenuItem>
          </Link>
        </div>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={BASKET_ROUTE}>
        <MenuItem className="d-flex mt-0">
          <IconButton aria-label="show 4 new mails" color="inherit">
            <Badge
              overlap="rectangular"
              badgeContent={cartTotalQuantity}
              color="secondary"
            >
              <ShoppingBasketIcon color="primary" />
            </Badge>
          </IconButton>
          <div className="mt-0 nav-link">Корзина</div>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle color="primary" />
        </IconButton>
        <div className="mt-0">Профиль</div>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Link className="header__link mr " to={HOME_ROUTE}>
              Mshop
            </Link>

            <Typography
              className={classes.title}
              variant="h6"
              noWrap
            ></Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge
                  overlap="rectangular"
                  badgeContent={cartTotalQuantity}
                  color="secondary"
                >
                  <Link className="header__link" to={BASKET_ROUTE}>
                    <ShoppingBasketIcon />
                  </Link>
                </Badge>
              </IconButton>

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
export default Navbar;
