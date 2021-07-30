import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    TimePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { es } from 'date-fns/locale';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { red } from '@material-ui/core/colors';
import Loading from '../loading/Loading';
import '../recepcionMx/RecepcionMx.css';
//import mxLaboratorio from '../../images/mxLaboratorio.jpg';

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
    formControl: {
        minWidth: 300,
        marginTop: 0
    }
}));

const RecepcionMx = props => {
    const classes = useStyles();
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper elevation={3} style={{ width: '100%', paddingBottom: 20 }}>
                <div className="row">
                    <div className="col-sm">
                        <div className={classes.title}>
                            <h4>{props.title}</h4>
                        </div>
                    </div>

                   {/*  <div className="col-sm">
                        <img className="image" style={{ float: 'right', marginTop: 10 }} src={mxLaboratorio} alt="mxLaboratorio" />
                    </div> */}
                </div>

                <div className="input-group row" style={{marginTop: 20}}>
                    <div className="col-sm" style={{ marginLeft: 10 }}>
                        <TextField
                            id="codeLabScan"
                            autoComplete="off"
                            type="text"
                            style={{ width: '50%' }}
                            maxLength={50}
                            className="form-control"
                            name="codeLabScan"
                            value={props.codeLabScan}
                            //onChange={props.onChangeBarcode}
                            onKeyDown={props.onKeyPressBarcode}
                            label="Cod-lab scan" />
                    </div>
                </div>
                <div className="input-group row" style={{ marginTop: 20 }}>
                    <div className="col-5" style={{ marginLeft: 10 }}>
                        {/* <label>Nombre del participante</label> */}
                        <TextField
                            id="nameRecep"
                            autoComplete="off"
                            type="text"
                            maxLength={50}
                            style={{ height: 'auto' }}
                            className="form-control"
                            name="name"
                            readOnly={true}
                            value={props.name}
                            inputProps={{
                                style: { fontWeight: 'bold' }
                            }}
                            label="Nombre del participante" />
                    </div>
                    <div className="col-sm">
                        {/* <label>Estudio</label> */}
                        <TextField
                            id="studyRecep"
                            autoComplete="off"
                            type="text"
                            maxLength={50}
                            style={{ height: 'auto' }}
                            className="form-control"
                            name="study"
                            readOnly={true}
                            value={props.study}
                            inputProps={{
                                style: { fontWeight: 'bold' }
                            }}
                            label="Estudio" />
                    </div>
                    <div className="col-sm">
                        {/* <label>Edad</label> */}
                        <TextField
                            id="ageRecep"
                            autoComplete="off"
                            type="text"
                            maxLength={50}
                            style={{ height: 'auto' }}
                            className="form-control"
                            name="age"
                            value={props.age}
                            readOnly={true}
                            inputProps={{
                                style: { fontWeight: 'bold', backgroundColor: 'none' }
                            }}
                            label="Edad" />
                    </div>
                </div>
                <div className="input-group row" style={{ marginTop: 20 }}>
                    <div className="col-sm" style={{ marginLeft: 10 }}>
                        <TextField
                            id="codeRecep"
                            autoComplete="off"
                            type="text"
                            maxLength={10}
                            style={{ height: 'auto' }}
                            className="form-control"
                            name="code"
                            value={props.code}
                            readOnly={true}
                            inputProps={{
                                style: { fontWeight: 'bold', backgroundColor: 'none' }
                            }}
                            label="Código" />
                    </div>
                    <div className="col-sm">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="test-input-label-request">Solicitado por</InputLabel>
                            <Select
                                labelId="request-label"
                                id="request-select"
                                value={props.selectedMedico}
                                onChange={props.onSelectRequestBy}
                            >
                                <MenuItem value="0">
                                    <em>None</em>
                                </MenuItem>
                                {props.medicos.map((e, keyIndex) => {
                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                })
                                }
                            </Select>
                            <label className="messageError">{props.errorMedico}</label>
                        </FormControl>
                    </div>
                    <div className="col-sm">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="tomada-por-input-label">Laboratorista</InputLabel>
                            <Select
                                labelId="tomada-por-label"
                                id="tomada-por-select"
                                value={props.selectedBioanalista}
                                onChange={props.handleChangeBionalista}
                            >
                                <MenuItem value="0">
                                    <em>None</em>
                                </MenuItem>
                                {props.bioanalistas.map((e, keyIndex) => {
                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                })
                                }
                            </Select>
                            <label className="messageError">{props.errorBioanlista}</label>
                        </FormControl>
                    </div>
                </div>
                <div className="row" style={{ marginLeft: 5 }}>
                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                        <Grid container justify="space-between">
                            <div className="col-sm">
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog-fif"
                                    label="FIF"
                                    format="dd/MM/yyyy"
                                    autoOk={true}
                                    value={props.fif !== null ? props.fif : null}
                                    onChange={props.handleChangeFif}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <label className="messageError row">{props.errorFif}</label>
                            </div>
                            <div className="col-sm">
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog-fis"
                                    label="FIS"
                                    format="dd/MM/yyyy"
                                    autoOk={true}
                                    value={props.fis !== null ? props.fis : null}
                                    onChange={props.handleChangeFis}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <label className="messageError row">{props.errorFis}</label>
                            </div>
                            <div className="col-sm" style={{ marginRight: 36 }}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog-fToma"
                                    label="Fecha toma"
                                    format="dd/MM/yyyy"
                                    autoOk={true}
                                    value={props.fechaToma !== null ? props.fechaToma : null}
                                    onChange={props.handleChangeFtoma}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <label className="messageError row">{props.errorFechaToma}</label>
                            </div>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div >
                <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                    <Grid container justify="space-between">
                        <div className="col-sm" style={{ marginTop: 15, marginLeft: 10 }}>
                            <TimePicker
                                id="horaToma"
                                label="Hora toma"
                                value={props.selectedHoraToma}
                                onChange={date => props.handleChangeHoraToma(date)}
                            />
                            <div>
                                <label className="messageError">{props.errorHoraToma}</label>
                            </div>
                        </div>
                        <div className="col-sm" style={{ marginTop: 15 }}>
                            <TimePicker
                                id="horaRefrigeracion"
                                label="Hora refrigeración"
                                value={props.selectedHoraToma}
                                onChange={date => props.handleChangeHoraRefrigeracion(date)}
                            />
                            <div>
                                <label className="messageError">{props.errorHoraRefrigeracion}</label>
                            </div>
                        </div>
                        <div className="col-sm">
                            <TextField
                                id="volMedioMl"
                                autoComplete="off"
                                type="text"
                                style={{ marginTop: 15 }}
                                maxLength={50}
                                name="volMedioMl"
                                value={props.volMedioMl}
                                onChange={props.handleChangeVolMedioMl}
                                label="Vol. del medio(ml)" />
                        </div>
                    </Grid>
                </MuiPickersUtilsProvider>
                <div className="input-group row" style={{ marginTop: 10, marginLeft: 10 }}>
                    <div className="col-lg">
                        <TextField
                            id="observations"
                            autoComplete="off"
                            type="text"
                            style={{ height: 'auto', width: '98%' }}
                            maxLength={500}
                            multiline={true}
                            className="form-control"
                            name="observations"
                            value={props.observations}
                            onChange={props.handleChangeObservations}
                            label="Observaciones" />
                    </div>
            </div>
            </Paper>
        </>
    );
}

export default RecepcionMx;