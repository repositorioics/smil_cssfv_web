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
import MxTransmisionLnParte1 from '../mxTransmisionLn/MxTransmisionLnParte1';
import MxTransmisionLnParte2 from '../mxTransmisionLn/MxTransmisionLnParte2';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import '../mxTransmisionLn/MxTransmisionLn.css';

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

const MxTransmisionLn = props => {
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
                            {/* <FormControlLabel
                                className={classes.heading}
                                aria-label="Acknowledge"
                                control={<Description style={{color: "#aba7a7"}}/>}
                                label="Datos Generales"
                            /> */}
                            <Typography className={classes.heading}>Datos Generales</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxTransmisionLnParte1
                                    code={props.code}
                                    selectedTipoPrueba={props.selectedTipoPrueba}
                                    tipoPrueba={props.tipoPrueba}
                                    codeLabScan={props.codeLabScan}
                                    //selectedConsulta={props.selectedConsulta}
                                    //consultas={props.consultas}
                                    selectedMedico={props.selectedMedico}
                                    medicos={props.medicos}
                                    name={props.name}
                                    study={props.study}
                                    age={props.age}
                                    codLab={props.codLab}
                                    codLabScan={props.codLabScan}
                                    fif={props.fif}
                                    //fis={props.fis}
                                    fechaToma={props.fechaToma}
                                    transmision={props.transmision}
                                    handleChangeCode={props.handleChangeCode}
                                    onKeyPressCode={props.onKeyPressCode}
                                    handleChangeTipoPrueba={props.handleChangeTipoPrueba}
                                    //handleChangeConsulta={props.handleChangeConsulta}
                                    handleChangeMedico={props.handleChangeMedico}
                                    handleChangeFif={props.handleChangeFif}
                                    //handleChangeFis={props.handleChangeFis}
                                    handleChangeFtoma={props.handleChangeFtoma}
                                    handleChangeTransmision={props.handleChangeTransmision}
                                    disableCode={props.disableCode}

                                    errorCode={props.errorCode}
                                    errorTubo={props.errorTubo}
                                    //errorConsulta={props.errorConsulta}
                                    errorVisita={props.errorVisita}
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
                            <Typography className={classes.heading}>Información - Muestra Tomada</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxTransmisionLnParte2
                                    bioanalistas={props.bioanalistas}
                                    tipoMuestra={props.tipoMuestra}
                                    selectedBioanalista={props.selectedBioanalista}
                                    selectedTipoMx={props.selectedTipoMx}
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
                                    handleChangeTipoMx={props.handleChangeTipoMx}
                                    handleChangeObservations={props.handleChangeObservations}
                                    handleChangeMotivoNoMx={props.handleChangeMotivoNoMx}
                                    handleChangeMxTomada={props.handleChangeMxTomada}
                                    handleChangeMxNoTomada={props.handleChangeMxNoTomada}
                                    handleChangeHoraToma={props.handleChangeHoraToma}
                                    handleChangeVolSangre={props.handleChangeVolSangre}

                                    errorFis={props.errorFis}
                                    errorFif={props.errorFif}
                                    errorMotivoNoMx={props.errorMotivoNoMx}
                                    errorHoraToma={props.errorHoraToma}
                                    errorVolSangre={props.errorVolSangre}
                                    errorBioanlista={props.errorBioanlista}
                                    errorHoraRefrigeracion={props.errorHoraRefrigeracion}
                                />
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.saveMxTomada}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
                </div>
                {/* <div className={classes.root} style={{ boxShadow: "none" }}>
                    <div className="hdr, row, m-top">
                        <div className="title">
                            <h4>{props.title}</h4>
                        </div>
                    </div>
                    <Stepper alternativeLabel activeStep={props.activeStep} connector={<ColorlibConnector />}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        <main className={classes.instructions}>{getStepContent(props.activeStep)}</main>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button disabled={props.activeStep === 0} onClick={props.handleBack} className={classes.button}>
                            Regresar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={props.handleNext}
                            className={classes.button}
                        >
                            {props.activeStep === steps.length - 1 ? 'Fin' : 'Siguiente'}
                        </Button>
                    </div>
                </div> */}
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

export default MxTransmisionLn;