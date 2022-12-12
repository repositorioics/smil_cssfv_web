import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Icons from '@mui/icons-material';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import Home from '@material-ui/icons/Home';
import Image from 'react-bootstrap/Image';
import Logo from '../../images/logo.png';

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex"
    },
    appBar: {
        background: '#2E3B55',
        zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonIconClosed: {
        transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: "rotate(0deg)"
    },
    menuButtonIconOpen: {
        transition: theme.transitions.create(["transform"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        transform: "rotate(180deg)"
    },
    hide: {
        display: "none"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        overflowX: "hidden",
        width: theme.spacing(6),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9)
        }
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        marginTop: theme.spacing(-2),
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(4)
    },
    grow: {
        flexGrow: 1
    },
}));

const Header = ({ children }) => {
    const [state, setState] = useState({});
    const accountData = JSON.parse(localStorage.getItem('accountData'));
    let menuOption = [];
    if (accountData) {
        const menu = accountData.menus;
        menuOption = menu.filter((item) => Object.keys(item.opciones).length > 0);
    }

    const history = useHistory();

    const [open, setOpen] = useState(true)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseSession = () => {
        setAnchorEl(null);
        localStorage.removeItem('token');
        localStorage.removeItem('accountData');
        localStorage.removeItem('_expiredTime');
        history.push('/');
    }

    const gotoHome = () => {
        closeMenu();
        history.push('/home');
    }

    const closeMenu = () => {
        if (open) {
            setOpen(!open);
        }
    }

    const handleClick = (key) => () => {
        setState({ [key]: !state[key] });
    };

    const classes = useStyles();
    const openEl = Boolean(anchorEl);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar style={{ minHeight: 0 }}
                position="fixed"
                className={classes.appBar}
                foojon={classNames(classes.appBar, {
                    [classes.appBarShift]: open
                })}>
                <Toolbar disableGutters={true}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={handleDrawerOpen}
                        className={classes.menuButton}>
                        <MenuIcon
                            classes={{
                                root: open
                                    ? classes.menuButtonIconOpen
                                    : classes.menuButtonIconClosed
                            }} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                        noWrap>
                        <Image src={Logo} style={{ width: 30, marginRight: 5 }} roundedCircle />
                        Sistema de manejo de infomación de laboratorio
                    </Typography>
                    <Typography
                        variant="h6"
                        color="inherit"
                        className={classes.grow}
                        style={{ textAlign: "end" }}
                        noWrap>
                        {accountData ? accountData.usuario : ""}
                    </Typography>
                    <div>
                        <IconButton
                            aria-owns={openEl ? "menu-appbar" : undefined}
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit">
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right"
                            }}
                            open={openEl}
                            onClose={handleClose}>
                            <MenuItem onClick={handleCloseSession}>Cerrar Sessión</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={classNames(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open
                })}
                classes={{
                    paper: classNames({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open
                    })
                }}
                open={open}>
                <div className={classes.toolbar} />
                <List>
                    <ListItem button onClick={() => gotoHome()}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </List>
                <List>
                    {menuOption.map(({ id, nombre, icono, opciones }) => {
                        const open = state[id] || false;
                        let IconMenu = Icons[icono];
                        return (
                            <div key={id}>
                                <ListItem button onClick={handleClick(id)}>
                                    <ListItemIcon>
                                        {IconMenu !== undefined ? <IconMenu /> : null}
                                    </ListItemIcon>
                                    <ListItemText primary={nombre} />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {opciones.map(({ id, nombre, url, iconoSubMenu }) => (
                                            <ListItem key={id} button className={classes.nested} component={Link} to={url}>
                                                <ListItemIcon>
                                                </ListItemIcon>
                                                <ListItemText primary={nombre} />
                                            </ListItem>
                                        ))}
                                    </List>
                                    <Divider />
                                </Collapse>
                            </div>
                        );
                    })}
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
            </main>
        </div>
    );
}

Header.propTypes = {
    children: PropTypes.node.isRequired,
};
export default (Header);