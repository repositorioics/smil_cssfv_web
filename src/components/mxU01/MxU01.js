import React from 'react';
//import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
//import Stepper from '@material-ui/core/Stepper';
//import Step from '@material-ui/core/Step';
//import StepLabel from '@material-ui/core/StepLabel';
//import Check from '@material-ui/icons/Check';
//import Description from '@material-ui/icons/Description';
//import Info from '@material-ui/icons/Info';
//import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Loading from '../loading/Loading';
import MxU01Parte1 from '../mxU01/MxU01Parte1';
import MxU01Parte2 from '../mxU01/MxU01Parte2';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import '../mxU01/MxU01.css';
//import Utils from '../../utils/Utils';

/* const useQontoStepIconStyles = makeStyles({
    root: {
        color: '#eaeaf0',
        display: 'flex',
        height: 22,
        alignItems: 'center',
    },
    active: {
        color: '#784af4',
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
    completed: {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
}); */

/* function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
            })}
        >
            {completed ? <Check className={classes.completed} /> : <div className={classes.circle} />}
        </div>
    );
} */

/* QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     
    completed: PropTypes.bool,
}; */

/* const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector); */

/* const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },

});
 */
/* function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <Description />,
        2: <Info />,
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
} */

/* ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     
    icon: PropTypes.node,
}; */

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
    /* root: {
        width: '100%',
    },
    
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    
    }, */
}));

/* function getSteps() {
    return ['Datos Generales', 'Toma Muestra'];
} */

const MxU01 = props => {
    const classes = useStyles();

    //const steps = getSteps();

    /* const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <MxU01Parte1 
                            code={props.code}
                            selectedTubo={props.selectedTubo}
                            tipoTubo={props.tipoTubo}
                            codeLabScan={props.codeLabScan}
                            selectedConsulta={props.selectedConsulta}
                            consultas={props.consultas}
                            selectedClasificacion={props.selectedClasificacion}
                            clasificacion={props.clasificacion}
                            selectedMedico={props.selectedMedico}
                            medicos={props.medicos}
                            name={props.name}
                            study={props.study}
                            age={props.age}
                            codLab={props.codLab}

                            handleChangeCode={props.handleChangeCode}
                            onKeyPressCode={props.onKeyPressCode}
                            handleChangeTipoTubo={props.handleChangeTipoTubo}
                            handleChangeConsulta={props.handleChangeConsulta}
                            handleChangeClasificacion={props.handleChangeClasificacion}
                            handleChangeMedico={props.handleChangeMedico}

                            disableCode={props.disableCode}

                            errorCode={props.errorCode}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <MxU01Parte2 />
                    </>
                );
            default:
                return;
        }
    } */

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
                                <MxU01Parte1
                                    code={props.code}
                                    selectedTubo={props.selectedTubo}
                                    tipoTubo={props.tipoTubo}
                                    codeLabScan={props.codeLabScan}
                                    selectedVisita={props.selectedVisita}
                                    consultas={props.consultas}
                                    selectedClasificacion={props.selectedClasificacion}
                                    clasificacion={props.clasificacion}
                                    selectedMedico={props.selectedMedico}
                                    medicos={props.medicos}
                                    name={props.name}
                                    study={props.study}
                                    age={props.age}
                                    codLab={props.codLab}
                                    codLabScan={props.codLabScan}
                                    fif={props.fif}
                                    fis={props.fis}
                                    fechaToma={props.fechaToma}
                                    handleChangeCode={props.handleChangeCode}
                                    onKeyPressCode={props.onKeyPressCode}
                                    handleChangeTipoTubo={props.handleChangeTipoTubo}
                                    handleChangeConsulta={props.handleChangeConsulta}
                                    handleChangeClasificacion={props.handleChangeClasificacion}
                                    handleChangeMedico={props.handleChangeMedico}
                                    handleChangeFif={props.handleChangeFif}
                                    handleChangeFis={props.handleChangeFis}
                                    handleChangeFtoma={props.handleChangeFtoma}
                                    disableCode={props.disableCode}

                                    errorCode={props.errorCode}
                                    errorTubo={props.errorTubo}
                                    errorConsulta={props.errorConsulta}
                                    errorClasificacion={props.errorClasificacion}
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
                            {/* <FormControlLabel
                                className={classes.heading}
                                aria-label="Acknowledge"
                                control={<Info style={{color: "#aba7a7"}}/>}
                                label="Muestra Tomada"
                            /> */}
                            <Typography className={classes.heading}>Información - Muestra Tomada</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxU01Parte2
                                    bioanalistas={props.bioanalistas}
                                    selectedBioanalista={props.selectedBioanalista}
                                    observations={props.observations}
                                    motivoNoMx={props.motivoNoMx}
                                    mxTomada={props.mxTomada}
                                    mxNoTomada={props.mxNoTomada}
                                    selectedHoraToma={props.selectedHoraToma}
                                    selectedHoraRefrigeracion={props.selectedHoraRefrigeracion}
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
                                    handleChangeHoraRefrigeracion={props.handleChangeHoraRefrigeracion}
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
                    onClick={() => props.goBackListMxUO1()}>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Salir</Tooltip>}>
                        <CloseIcon />
                    </OverlayTrigger>
                </Fab>
            </Paper>
        </>
    );
}

export default MxU01;