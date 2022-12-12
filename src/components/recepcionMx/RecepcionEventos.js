import React from 'react';
//import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SaveIcon from '@mui/icons-material/Save';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ArrowRight from '@mui/icons-material/ArrowRight';
import Settings from '@mui/icons-material/Settings';
import '../recepcionMx/RecepcionMx.css';


const FireNav = styled(List)({
    '& .MuiListItemButton-root': {
        paddingLeft: 10,
        paddingRight: 10,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

const useStyles = makeStyles(() => ({
    MuiPaperRoot1: {
        backgroundColor: '#fff0'
    },
    MuiSvgIconRoot1: {
        fontSize: '25px !important'
    },
    MuiListItemroot1: {
        "&:hover": {
          backgroundColor: "#989E9C !important",
          color: "white",
          "& .MuiListItemIcon-root": {
            color: "white"
          },
          "& .MuiListItemText-root": {
            color: "white"
          }
        }
      }
}));

function RecepcionEventos(props) {
    const classes = useStyles();
    //const [open, setOpen] = useState(false);
    //console.log('props', props);
    return (
        <Box className="float_acctions">
            {/* <ThemeProvider  sx={{ display: 'flex' }} esto estaba en el box
                theme={createTheme({
                    components: {
                        MuiListItemButton: {
                            defaultProps: {
                                disableTouchRipple: true,
                            },
                        },
                    },
                    palette: {
                        mode: 'dark',
                        primary: { main: 'rgb(102, 157, 246)' },
                        background: { paper: 'rgb(5, 30, 52)' },
                    },
                })}
            > */}
                <Paper elevation={0} className={classes.MuiPaperRoot1}>
                    <FireNav component="nav" disablePadding>
                        <Box
                            sx={{
                                width: '160px',
                                height: '188px',
                                bgcolor: props.openEventButtons ? 'rgba(71, 98, 130, 0.2)' : 'transparent',
                                pb: props.openEventButtons ? 2 : 0,
                            }}
                        >
                            <Tooltip title='Acciones'>
                                <IconButton
                                    onClick={props.onClickEventButtons}
                                    size='large'
                                    sx={{
                                        '& svg': {
                                            color: '#dc3545 !important',
                                            transition: '0.2s',
                                            transform: 'translateX(0) rotate(0)',
                                        },
                                        '&:hover, &:focus': {
                                            bgcolor: 'unset',
                                            '& svg:first-of-type': {
                                                transform: 'translateX(-4px) rotate(-20deg)',
                                            },
                                            '& svg:last-of-type': {
                                                right: 0,
                                                opacity: 1,
                                            },
                                        },
                                        '&:after': {
                                            content: !props.openEventButtons ? '""' : '"Eventos"',
                                            fontSize: 14,
                                            color: '#dc3545 !important',
                                            fontWeight: 'bold !important',
                                            position: 'absolute',
                                            height: '50%',
                                            marginLeft: '45px',
                                            marginTop: '5px',
                                            display: 'block',
                                            left: 0,
                                            width: '1px',
                                            bgcolor: 'divider',
                                        },
                                    }}
                                >
                                    <Settings className={classes.MuiSvgIconRoot1} />
                                    <ArrowRight sx={{ position: 'absolute', right: 4, opacity: 0 }} />
                                </IconButton>
                            </Tooltip>
                            {props.openEventButtons ?
                                <>
                                    <ListItem component="div" className={classes.MuiListItemroot1}>
                                        <ListItemButton
                                            key={'guardar'}
                                            sx={{ py: 0, minHeight: 32, color: '#0B6BC1 !important' }}
                                            onClick={props.saveRecepcion}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit' }}>
                                                <SaveIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={'Guardar'}
                                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold !important' }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <ListItem component="div" className={classes.MuiListItemroot1}>
                                        <ListItemButton
                                            key={'buscar'}
                                            sx={{ py: 0, minHeight: 32, color: '#6B033C !important' }}
                                            onClick={props.search}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit' }}>
                                                <ContentPasteSearchIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={'Buscar'}
                                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold !important' }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider style={{ background: 'white' }} />
                                    <ListItem component="div" className={classes.MuiListItemroot1}>
                                        <ListItemButton
                                            key={'nueva'}
                                            sx={{ py: 0, minHeight: 32, color: '#dc3545 !important' }}
                                            onClick={props.nuevaRecepcion}
                                        >
                                            <ListItemIcon sx={{ color: 'inherit' }}>
                                                <AddCircleOutlineOutlinedIcon />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={'Nueva'}
                                                primaryTypographyProps={{ fontSize: 14, fontWeight: 'bold !important' }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </>
                                : null}
                        </Box>
                    </FireNav>
                </Paper>
            {/* </ThemeProvider> */}
        </Box>
    );
}

export default RecepcionEventos;