import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Loading from '../loading/Loading';
import MxBhcParte1 from '../mxBhc/MxBhcParte1';
import MxBhcParte2 from '../mxBhc/MxBhcParte2';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import '../mxBhc/MxBhc.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: 'bold',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: '2rem',
        marginLeft: '10px',
        paddingBottom: '10px',
        paddingTop: '10px',
        fontWeight: 'bold',
    },
    fabColor: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        color: theme.palette.common.white,
        backgroundColor: red[900],
        '&:hover': {
            backgroundColor: red[600],
        },
    },
    button: {
        //marginRight: theme.spacing(1),
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

const MxBhc = props => {
    const classes = useStyles();
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper elevation={3} style={{ width: '100%', paddingBottom: 10 }}>
                <div className={classes.title}>
                    <h4>{props.title}</h4>
                </div>
                <div className={classes.root}>
                    <Accordion expanded={props.expanded1 === 'panel1'} onChange={props.handleChangePanel1('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>Datos Generales</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxBhcParte1
                                    code={props.code}
                                    selectedMedico={props.selectedMedico}
                                    medicos={props.medicos}
                                    name={props.name}
                                    study={props.study}
                                    age={props.age}
                                    codLab={props.codLab}
                                    fif={props.fif}
                                    fechaToma={props.fechaToma}
                                    handleChangeCode={props.handleChangeCode}
                                    onKeyPressCode={props.onKeyPressCode}
                                    handleChangeMedico={props.handleChangeMedico}
                                    handleChangeFif={props.handleChangeFif}
                                    handleChangeFtoma={props.handleChangeFtoma}
                                    disableCode={props.disableCode}
                                    errorCode={props.errorCode}
                                    errorMedico={props.errorMedico}
                                    errorFechaToma={props.errorFechaToma}
                                />
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.saveDatosGenerales}
                                disabled={props.disablePacienteMenor}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
                    <Accordion expanded={props.expanded2 === 'panel2'} onChange={props.handleChangePanel2('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                        <Typography className={classes.heading}>Informaci??n - Muestra Tomada</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxBhcParte2
                                    bioanalistas={props.bioanalistas}
                                    selectedBioanalista={props.selectedBioanalista}
                                    observations={props.observations}
                                    motivoNoMx={props.motivoNoMx}
                                    mxTomada={props.mxTomada}
                                    mxNoTomada={props.mxNoTomada}
                                    selectedHoraToma={props.selectedHoraToma}
                                    volSangre={props.volSangre}
                                    motivoNoFif={props.motivoNoFif}
                                    disabledMotivoNoMx={props.disabledMotivoNoMx}
                                    disableMxNoTomada={props.disableMxNoTomada}
                                    disabledMotivoNoFif={props.disabledMotivoNoFif}
                                    handleChangeMotivoNoFif={props.handleChangeMotivoNoFif}
                                    handleChangeBionalista={props.handleChangeBionalista}
                                    handleChangeObservations={props.handleChangeObservations}
                                    handleChangeMotivoNoMx={props.handleChangeMotivoNoMx}
                                    handleChangeMxTomada={props.handleChangeMxTomada}
                                    handleChangeMxNoTomada={props.handleChangeMxNoTomada}
                                    handleChangeHoraToma={props.handleChangeHoraToma}
                                    handleChangeVolSangre={props.handleChangeVolSangre}
                                    errorFif={props.errorFif}
                                    errorMotivoNoMx={props.errorMotivoNoMx}
                                    errorHoraToma={props.errorHoraToma}
                                    errorVolSangre={props.errorVolSangre}
                                    errorBioanlista={props.errorBioanlista}
                                />
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.saveMxTomada}
                                disabled={props.disablePacienteMenor}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
                </div>
                <Fab size="small" className={clsx(classes.fab, classes.fabColor)} aria-label="add"
                    onClick={() => props.goBackListMxTransmision()}>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Salir</Tooltip>}>
                        <CloseIcon />
                    </OverlayTrigger>
                </Fab>
            </Paper>
        </>
    );
}

export default MxBhc;