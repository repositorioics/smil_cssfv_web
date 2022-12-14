import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import MxInfluenzaParte1 from '../mxInfluenza/MxInfluenzaParte1';
import MxInfluenzaParte2 from '../mxInfluenza/MxInfluenzaParte2';
import MxInfluenzaParte3 from '../mxInfluenza/MxInfluenzaParte3';
import MxInfluenzaParte4 from '../mxInfluenza/MxInfluenzaParte4';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loading from '../loading/Loading';

import '../mxInfluenza/MxInfluenza.css';

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

const MxInfluenza = props => {
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
                                    codLabScan={props.codLabScan}
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
                                    onChangeBarcode={props.onChangeBarcode}
                                    onKeyPressBarcode={props.onKeyPressBarcode}
                                    onKeyPressFif={props.onKeyPressFif}
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
                                    abrirImpresion={props.abrirImpresion}
                                    disableCode={props.disableCode}
                                    disableTypeOfTest={props.disableTypeOfTest}
                                    disabledCodeLabScan={props.disabledCodeLabScan}
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
                        <Typography className={classes.heading}>Muestra Tomada</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
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
                    <Accordion expanded={props.expanded3 === 'panel3'} onChange={props.handleChangePanel3('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>Prueba R??pida - Influenza</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
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
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.savePRI}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
                    <Accordion expanded={props.expanded4 === 'panel4'} onChange={props.handleChangePanel4('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                        <Typography className={classes.heading}>Prueba R??pida - VSR</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
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
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.savePRVSR}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
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