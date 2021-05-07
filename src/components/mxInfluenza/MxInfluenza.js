import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import Description from '@material-ui/icons/Description';
import Info from '@material-ui/icons/Info';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
//import Typography from '@material-ui/core/Typography';
//import { Multiselect } from 'multiselect-react-dropdown';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import MxInfluenzaParte1 from '../mxInfluenza/MxInfluenzaParte1';
import MxInfluenzaParte2 from '../mxInfluenza/MxInfluenzaParte2';
import MxInfluenzaParte3 from '../mxInfluenza/MxInfluenzaParte3';
import MxInfluenzaParte4 from '../mxInfluenza/MxInfluenzaParte4';
//import TextField from '@material-ui/core/TextField';
import Loading from '../loading/Loading';

import '../mxInfluenza/MxInfluenza.css';
//import Utils from '../../utils/Utils';

const useQontoStepIconStyles = makeStyles({
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
});

function QontoStepIcon(props) {
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
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
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
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
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

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <Description />,
        2: <Info />,
        3: <Info />,
        4: <Info />,
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
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
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
}));

function getSteps() {
    return ['Datos Generales', 'Muestra Tomada', 'Prueba Rápida - Influenza', 'Prueba Rápida - VSR'];
}

const MxInfluenza = props => {
    const classes = useStyles();

    const steps = getSteps();

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <>
                        <MxInfluenzaParte1
                            classes={classes}
                            code={props.code}
                            mxCv={props.mxCv}
                            positivoMi={props.positivoMi}
                            medicos={props.medicos}
                            codeLabScan={props.codeLabScan}
                            fif={props.fif}
                            fis={props.fis}
                            fechaToma={props.fechaToma}
                            codeLab={props.codeLab}
                            name={props.name}
                            study={props.study}
                            age={props.age}
                            dataTypeOfTest={props.dataTypeOfTest}
                            onKeyPressCode={props.onKeyPressCode}
                            selectedMedico={props.selectedMedico}
                            onSelectRequestBy={props.onSelectRequestBy}
                            selectedTypeOfTest={props.selectedTypeOfTest}
                            handleChangeTypeOfTest={props.handleChangeTypeOfTest}
                            onSelectTypeOfTest={props.onSelectTypeOfTest}
                            handleChangeCode={props.handleChangeCode}
                            handleChangeMxCv={props.handleChangeMxCv}
                            handleChangepositivoMi={props.handleChangepositivoMi}
                            /* handleChangeCodeLabScan={props.handleChangeCodeLabScan} */
                            handleChangeFif={props.handleChangeFif}
                            handleChangeFis={props.handleChangeFis}
                            handleChangeFtoma={props.handleChangeFtoma}
                            /* handleChangeCodeLab={props.handleChangeCodeLab} */
                            errorCode={props.errorCode}
                            errorMedico={props.errorMedico}
                            errorFis={props.errorFis}
                            errorFif={props.errorFif}
                            errorFechaToma={props.errorFechaToma}
                            errorTypeOfTest={props.errorTypeOfTest}
                            show={props.show}
                            handleClose={props.handleClose}
                            openPrint={props.openPrint}
                            printCode={props.printCode}
                            disableCode={props.disableCode}
                            disableTypeOfTest={props.disableTypeOfTest}
                        />
                    </>
                );
            case 1:
                return (
                    <>
                        <MxInfluenzaParte2
                            mxTomada={props.mxTomada}
                            mxNoTomada={props.mxNoTomada}
                            esRetoma={props.esRetoma}
                            bioanalistas={props.bioanalistas}
                            selectedBioanalista={props.selectedBioanalista}
                            handleChangeBionalista={props.handleChangeBionalista}
                            typeMx={props.typeMx}
                            mismoEpFif={props.mismoEpFif}
                            selectedTypeOfMx={props.selectedTypeOfMx}
                            onSelectTypeOfMx={props.onSelectTypeOfMx}
                            selectedHoraToma={props.selectedHoraToma}
                            selectedMismoEpFif={props.selectedMismoEpFif}
                            onSelectMismoEpFif={props.onSelectMismoEpFif}
                            volMedioMl={props.volMedioMl}
                            observations={props.observations}
                            motivoNoFif={props.motivoNoFif}
                            motivoNoMx={props.motivoNoMx}
                            handleChangeMxTomada={props.handleChangeMxTomada}
                            handleChangeMxNoTomada={props.handleChangeMxNoTomada}
                            handleChangeEsRetoma={props.handleChangeEsRetoma}
                            handleChangeHoraToma={props.handleChangeHoraToma}
                            handleChangeVolMedioMl={props.handleChangeVolMedioMl}
                            handleChangeObservations={props.handleChangeObservations}
                            handleChangeMotivoNoFif={props.handleChangeMotivoNoFif}
                            handleChangeMotivoNoMx={props.handleChangeMotivoNoMx}
                            errorBioanlista={props.errorBioanlista}
                            errorTypeOfMx={props.errorTypeOfMx}
                            errorHoraToma={props.errorHoraToma}
                            errorVolMedio={props.errorVolMedio}
                            errorMotivoSinFif={props.errorMotivoSinFif}
                            errorMotivoNoMx={props.errorMotivoNoMx}
                            disabledMotivoNoFif={props.disabledMotivoNoFif}
                            disabledMismoEpFebril={props.disabledMismoEpFebril}
                            disabledMotivoNoMx={props.disabledMotivoNoMx}
                            disableMxNoTomada={props.disableMxNoTomada}
                            disabledEsRetoma={props.disabledEsRetoma}
                        />
                    </>
                );
            case 2:
                return (
                    <>
                        <MxInfluenzaParte3
                            prFlu={props.prFlu}
                            testNumberFlu={props.testNumberFlu}
                            testResultFlu={props.testResultFlu}
                            observationsPr={props.observationsPr}
                            handleChangePrFlu={props.handleChangePrFlu}
                            handleChangeTestNumberFlu={props.handleChangeTestNumberFlu}
                            handleChangeTesResultFlu={props.handleChangeTesResultFlu}
                            handleChangeObservationsPr={props.handleChangeObservationsPr}
                            isMxCv={props.isMxCv}
                            dataResult={props.dataResult}
                            selectedResult={props.selectedResult}
                            handleChangeResult={props.handleChangeResult}
                            errorTestNumberFlu={props.errorTestNumberFlu}
                            errorMessageResult={props.errorMessageResult}
    
                        />
                    </>
                );
            case 3:
                return (
                    <>
                        <MxInfluenzaParte4
                            prVsr={props.prVsr}
                            testNumberVsr={props.testNumberVsr}
                            testResultVsr={props.testResultVsr}
                            observationsPrVsr={props.observationsPrVsr}
                            handleChangePrVsr={props.handleChangePrVsr}
                            handleChangeTestNumberVsr={props.handleChangeTestNumberVsr}
                            handleChangeTesResultVsr={props.handleChangeTesResultVsr}
                            handleChangeObservationsPrVsr={props.handleChangeObservationsPrVsr}
                            isMxCv={props.isMxCv}
                            dataResultVsr={props.dataResultVsr}
                            errorTestNumberFluVsr={props.errorTestNumberFluVsr}
                            errorMessageResultVsr={props.errorMessageResultVsr}
    
                        />
                    </>
                );
            default:
                return;
        }
    }

    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper className="container" elevation={3} style={{ paddingBottom: 10 }}>
                <div className={classes.root} style={{ boxShadow: "none" }}>
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
                </div>
                <Fab size="small" className={clsx(classes.fab, classes.fabColor)} aria-label="add"
                    onClick={() => props.goBackListMxInfluenza()}>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Salir</Tooltip>}>
                        <CloseIcon />
                    </OverlayTrigger>
                </Fab>
            </Paper>
        </>
    );
}

export default MxInfluenza;