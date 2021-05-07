import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
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
//import InboxIcon from '@material-ui/icons/MoveToInbox';
//import MailIcon from '@material-ui/icons/Mail';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import Home from '@material-ui/icons/Home';
import ListAlt from '@material-ui/icons/ListAlt';
import Security from '@material-ui/icons/Security';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Category from '@material-ui/icons/Category';
import Assignment from '@material-ui/icons/Assignment';
import PersonAdd from '@material-ui/icons/PersonAdd';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import RecentActors from '@material-ui/icons/RecentActors';
import Description from '@material-ui/icons/Description';
import Image from 'react-bootstrap/Image';
import Logo from '../../images/logo.png';

const drawerWidth = 250;
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
    }
}));

const Header = ({children}) => {

    const history = useHistory();
    //const marginLeft = "189.600px";

    const [open, setOpen] = useState(false);
    const [openCatalogs, setOpenCatalogs] = useState(false);
    const [openMx, setOpenMx] = useState(false);
    const [openSecurity, setOpenSecurity] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(!open);
        setOpenCatalogs(false);
        setOpenMx(false);
        setOpenSecurity(false);
        /*         const categoriaStyle = document.getElementById("categoria");
                if (open === false) {
                    categoriaStyle.style.marginLeft="260px";
                } else {
                    categoriaStyle.style.marginLeft=marginLeft;
                } */
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
        history.push('/');
    }

    const handleClickCat = () => {
        setOpenCatalogs(!openCatalogs);
    }

    const handleClickMx = () => {
        setOpenMx(!openMx);
    }

    const handleClickSecurity = () => {
        setOpenSecurity(!openSecurity);
    }

    const gotoHome = () => {
        closeMenu();
        history.push('/home');
    }
    const gotoCategoria = () => {
        closeMenu();
        history.push('/catalogo/categoria');
    }
    const gotoCamCategoria = () => {
        closeMenu();
        history.push('/catalogo/cambio-categoria');
    }
    const gotoClasificacion = () => {
        closeMenu();
        history.push('/catalogo/clasificacion');
    }
    const gotoConsultas = () => {
        closeMenu();
        history.push('/catalogo/consultas');
    }
    const gotoMotivoAnulacion = () => {
        closeMenu();
        history.push('/catalogo/motivo-anulacion');
    }
    const gotoMuestras = () => {
        closeMenu();
        history.push('/catalogo/cat-muestras');
    }
    const gotoTipoMuestras = () => {
        closeMenu();
        history.push('/catalogo/tipo-muestras');
    }
    const gotoTipoPruebas = () => {
        closeMenu();
        history.push('/catalogo/tipo-pruebas');
    }
    const gotoTubos = () => {
        closeMenu();
        history.push('/catalogo/tubos');
    }

    const gotoEpFefril = () => {
        closeMenu();
        history.push('/catalogo/episodios-febriles');
    }

    const gotoResultadoMuestra = () => {
        closeMenu();
        history.push('/catalogos/resultados-muestras');
    }

    const gotoUsers = () => {
        closeMenu();
        history.push('/seguridad/usuarios');
    }

    const gotoProfile = () => {
        closeMenu();
        history.push('/seguridad/perfiles');
    }

    const gotoUserProfile = () => {
        closeMenu();
        history.push('/seguridad/perfil-usuario');
    }

    const gotoMenu = () => {
        closeMenu();
        history.push('/seguridad/menu');
    }

    const gotoOptionsMenu = () => {
        closeMenu();
        history.push('/seguridad/opciones-menu');
    }

    const gotoProfileOptionsMenu = () => {
        closeMenu();
        history.push('/seguridad/perfil-opciones-menu');
    }

    const gotoMxInfluenza = () => {
        closeMenu();
        history.push('/muestras/influenza');
    }

    const closeMenu = () => {
        if (open) {
            setOpen(!open);
            setOpenCatalogs(false);
            setOpenMx(false);
            setOpenSecurity(false);
        }
    }

    //const { classes } = props;
    const classes = useStyles();
    const openEl = Boolean(anchorEl);
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar style={{minHeight: 0}}
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
                        usuario
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
                    {/* {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
                    <ListItem button onClick={() => gotoHome()}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItem>
                </List>
                <List>
                    <ListItem button onClick={handleClickCat}>
                        <ListItemIcon>
                            <ListAlt />
                        </ListItemIcon>
                        <ListItemText primary="Catalogos" />
                        {openCatalogs ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openCatalogs} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => gotoCategoria()}>
                                <ListItemIcon>
                                    <Category />
                                </ListItemIcon>
                                <ListItemText primary="Categoría" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoCamCategoria()}>
                                <ListItemIcon>
                                    <Category />
                                </ListItemIcon>
                                <ListItemText primary="Cambio Categoría" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoClasificacion()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Clasificación" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoConsultas()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Consultas" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoMotivoAnulacion()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Motivo Anulación" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoMuestras()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Muestras" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoTipoMuestras()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Tipos de Muestras" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoTipoPruebas()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Tipos de Pruebas" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoTubos()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Tubos" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoEpFefril()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Mismo Ep. Febril" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoResultadoMuestra()}>
                                <ListItemIcon>
                                    <Assignment />
                                </ListItemIcon>
                                <ListItemText primary="Resultados Muestras" />
                            </ListItem>
                            <Divider />
                        </List>
                    </Collapse>
                </List>
                <List>
                    <ListItem button onClick={handleClickMx}>
                        <ListItemIcon>
                            <LocalHospitalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Muestras" />
                        {openMx ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openMx} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => gotoMxInfluenza()}>
                                <ListItemIcon>
                                    <StarBorder />
                                </ListItemIcon>
                                <ListItemText primary="Influenza" />
                            </ListItem>
                            <Divider />
                        </List>
                    </Collapse>
                </List>
                <List>
                    <ListItem button onClick={handleClickSecurity}>
                        <ListItemIcon>
                            <Security />
                        </ListItemIcon>
                        <ListItemText primary="Seguridad" />
                        {openSecurity ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={openSecurity} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => gotoUsers()}>
                                <ListItemIcon>
                                    <PersonAdd />
                                </ListItemIcon>
                                <ListItemText primary="Usuarios" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoProfile()}>
                                <ListItemIcon>
                                    <AssignmentInd />
                                </ListItemIcon>
                                <ListItemText primary="Perfiles" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoUserProfile()}>
                                <ListItemIcon>
                                    <RecentActors />
                                </ListItemIcon>
                                <ListItemText primary="Perfil Usuario" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoMenu()}>
                                <ListItemIcon>
                                    <MenuIcon />
                                </ListItemIcon>
                                <ListItemText primary="Menú" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoOptionsMenu()}>
                                <ListItemIcon>
                                    <Description />
                                </ListItemIcon>
                                <ListItemText primary="Opciones Menú" />
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => gotoProfileOptionsMenu()}>
                                <ListItemIcon>
                                    <Description />
                                </ListItemIcon>
                                <ListItemText primary="Perfiles Opciones Menú" />
                            </ListItem>
                            <Divider />
                        </List>
                    </Collapse>
                </List>
                {/* <Divider />
                <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
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