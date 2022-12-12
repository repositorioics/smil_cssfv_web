import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { red } from '@material-ui/core/colors';
import CloseIcon from '@material-ui/icons/Close';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import MxDengueParte1 from '../mxDengue/MxDengueParte1';
import MxDengueParte2 from '../mxDengue/MxDengueParte2';
import MxDengueParte3 from '../mxDengue/MxDengueParte3';
import MxDengueParte4 from '../mxDengue/MxDengueParte4';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Loading from '../loading/Loading';

import '../mxDengue/MxDengue.css';

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

const MxDengue = props => {
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
                            id="panel1bh-header">
                            <Typography className={classes.heading}>Datos Generales</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxDengueParte1
                                    code={props.code}
                                    dataTypeOfTest={props.dataTypeOfTest}
                                    selectedTypeOfTest={props.selectedTypeOfTest}
                                    selectedTubo={props.selectedTubo}
                                    tipoTubo={props.tipoTubo}
                                    selectedConsulta={props.selectedConsulta}
                                    consultas={props.consultas}
                                    categoria={props.categoria}
                                    selectedCategoria={props.selectedCategoria}
                                    selectedMedico={props.selectedMedico}
                                    medicos={props.medicos}
                                    fif={props.fif}
                                    fis={props.fis}
                                    fechaToma={props.fechaToma}
                                    name={props.name}
                                    study={props.study}
                                    age={props.age}
                                    codeLab={props.codeLab}
                                    abrirImpresion={props.abrirImpresion}
                                    selectedCambCat={props.selectedCambCat}
                                    cambiosCategorias={props.cambiosCategorias}
                                    onSelectRequestBy={props.onSelectRequestBy}
                                    orina={props.orina}
                                    saliva={props.saliva}
                                    titleChkZkDen={props.titleChkZkDen}
                                    positvoZika={props.positvoZika}
                                    onKeyPressFif={props.onKeyPressFif}
                                    disableFif={props.disableFif}
                                    disableCode={props.disableCode}
                                    disableTypeOfTest={props.disableTypeOfTest}
                                    disableTubo={props.disableTubo}
                                    disableCambioCategoria={props.disableCambioCategoria}
                                    metabolomicaHide={props.metabolomicaHide}
                                    positivoZkDenHide={props.positivoZkDenHide}
                                    handleChangeCode={props.handleChangeCode}
                                    onKeyPressCode={props.onKeyPressCode}
                                    handleChangeTypeOfTest={props.handleChangeTypeOfTest}
                                    handleChangeTipoTubo={props.handleChangeTipoTubo}
                                    handleChangeConsulta={props.handleChangeConsulta}
                                    handleChangeCategoria={props.handleChangeCategoria}
                                    handleChangeCambCategoria={props.handleChangeCambCategoria}
                                    handleChangeFif={props.handleChangeFif}
                                    handleChangeFis={props.handleChangeFis}
                                    handleChangeFtoma={props.handleChangeFtoma}
                                    handleChangeOrina={props.handleChangeOrina}
                                    handleChangeSaliva={props.handleChangeSaliva}
                                    handleChangePositvoZika={props.handleChangePositvoZika}
                                    errorCode={props.errorCode}
                                    errorTypeOfTest={props.errorTypeOfTest}
                                    errorTubo={props.errorTubo}
                                    errorCategoria={props.errorCategoria}
                                    errorMedico={props.errorMedico}
                                    errorFis={props.errorFis}
                                    errorFif={props.errorFif}
                                    errorFechaToma={props.errorFechaToma}
                                    errorCambCategoria={props.errorCambCategoria}
                                />
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.saveGeneralData}
                                disabled={props.disableGeneralData}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
                    <Accordion expanded={props.expanded2 === 'panel2'} onChange={props.handleChangePanel2('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header">
                            <Typography className={classes.heading}>Muestra Tomada</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxDengueParte2
                                    mxTomada={props.mxTomada}
                                    motivoNoMx={props.motivoNoMx}
                                    mxPapelFiltro={props.mxPapelFiltro}
                                    mxNoTomada={props.mxNoTomada}
                                    selectedBioanalista={props.selectedBioanalista}
                                    bioanalistas={props.bioanalistas}
                                    disabledMotivoNoMx={props.disabledMotivoNoMx}
                                    selectedHoraToma={props.selectedHoraToma}
                                    selectedHoraRefrigeracion={props.selectedHoraRefrigeracion}
                                    volMedioMl={props.volMedioMl}
                                    observations={props.observations}
                                    handleChangeBionalista={props.handleChangeBionalista}
                                    handleChangeMxTomada={props.handleChangeMxTomada}
                                    handleChangeMxPapelFiltro={props.handleChangeMxPapelFiltro}
                                    handleChangeMxNoTomada={props.handleChangeMxNoTomada}
                                    handleChangeMotivoNoMx={props.handleChangeMotivoNoMx}
                                    handleChangeHoraToma={props.handleChangeHoraToma}
                                    handleChangeHoraRefrigeracion={props.handleChangeHoraRefrigeracion}
                                    handleChangeVolMedioMl={props.handleChangeVolMedioMl}
                                    handleChangeObservations={props.handleChangeObservations}
                                    errorMotivoNoMx={props.errorMotivoNoMx}
                                    errorBioanlista={props.errorBioanlista}
                                    errorHoraToma={props.errorHoraToma}
                                    errorHoraRefrigeracion={props.errorHoraRefrigeracion}
                                    errorVolMedio={props.errorVolMedio}
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
                    <Accordion hidden={props.accordionPanel3} expanded={props.expanded3 === 'panel3'} onChange={props.handleChangePanel3('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header">
                            
                            <Typography className={classes.heading}>Muestra Separada</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxDengueParte3
                                    mxSeparada={props.mxSeparada}
                                    fechaSeparacion={props.fechaSeparacion}
                                    selectedHoraSeparacion={props.selectedHoraSeparacion}
                                    selectedBioanalistaVial={props.selectedBioanalistaVial}
                                    viales={props.viales}
                                    volumenSuero={props.volumenSuero}
                                    selectedHoraRefVial={props.selectedHoraRefVial}
                                    bioanalistas={props.bioanalistas}
                                    observationsMxSeparada={props.observationsMxSeparada}
                                    handleChangeFSeparacion={props.handleChangeFSeparacion}
                                    handleChangeBionalistaVial={props.handleChangeBionalistaVial}
                                    handleChangeMxSeparada={props.handleChangeMxSeparada}
                                    handleChangeHoraSeparacion={props.handleChangeHoraSeparacion}
                                    handleChangeViales={props.handleChangeViales}
                                    handleChangeVolumenSuero={props.handleChangeVolumenSuero}
                                    handleChangeHoraRefVial={props.handleChangeHoraRefVial}
                                    handleChangeObservationsMxSeparada={props.handleChangeObservationsMxSeparada}
                                    errorFechaSeparacion={props.errorFechaSeparacion}
                                    errorHoraSeparacion={props.errorHoraSeparacion}
                                    errorViales={props.errorViales}
                                    errorVolumenSuero={props.errorVolumenSuero}
                                    errorHoraRefVial={props.errorHoraRefVial}
                                    errorBioanlistaVial={props.errorBioanlistaVial}
                                />
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.saveMxSeparada}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
                    <Accordion hidden={props.accordionPanel4} expanded={props.expanded4 === 'panel4'} onChange={props.handleChangePanel4('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header">
                            <Typography className={classes.heading}>Prueba Rápida - Dengue</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className={classes.secondaryHeading} style={{ width: '90%', marginLeft: '5%' }}>
                                <MxDengueParte4
                                    dataResult={props.dataResult}
                                    mxPrDengue={props.mxPrDengue}
                                    procInmediato={props.procInmediato}
                                    numPrueba={props.numPrueba}
                                    selectedResult={props.selectedResult}
                                    observationsPrDengue={props.observationsPrDengue}
                                    handleChangeMxPrDengue={props.handleChangeMxPrDengue}
                                    handleChangeProcInmediato={props.handleChangeProcInmediato}
                                    handleChangeNumPrueba={props.handleChangeNumPrueba}
                                    handleChangeResult={props.handleChangeResult}
                                    handleChangeObservationsPrDengue={props.handleChangeObservationsPrDengue}
                                    errorNumPrueba={props.errorNumPrueba}
                                    errorMessageResult={props.errorMessageResult}
                                />
                            </div>
                        </AccordionDetails>
                        <div style={{ marginTop: 50 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={props.savePRDengue}
                                className={classes.button}
                            >Guardar
                            </Button>
                        </div>
                    </Accordion>
                </div>
                <Fab size="small" className={clsx(classes.fab, classes.fabColor)} aria-label="add"
                    onClick={() => props.goBackListMxDengue()}>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Salir</Tooltip>}>
                        <CloseIcon />
                    </OverlayTrigger>
                </Fab>
            </Paper>
        </>
    );
}

export default MxDengue;