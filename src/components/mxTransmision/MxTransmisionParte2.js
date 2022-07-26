import 'date-fns';
import React from 'react';
//import { Multiselect } from 'multiselect-react-dropdown';
import TextField from '@material-ui/core/TextField';
//import PrintIcon from '@material-ui/icons/Print';
//import { OverlayTrigger, Tooltip } from 'react-bootstrap';
//import { blue } from '@material-ui/core/colors';
//import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
                            
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../mxTransmision/MxTransmision.css';
//import { es } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 565,
        marginTop: 15
    },
    formControl2: {
        minWidth: 475,
        marginTop: 15
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    textField: {
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(1),
        width: 'auto',
        '& p': {
            color: 'red',
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: '10px'
        },
    },
}));

const MxTransmisionParte2 = props => {
    const classes = useStyles();
    return (
        <>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="checkbox mleft-20">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="mxTomada"
                            type="checkbox"
                            name="mxTomada"
                            checked={props.mxTomada}
                            onChange={props.handleChangeMxTomada}
                        /> Se tomada la muestra?
                            </label>
                </div>
                <div className="checkbox mleft-20">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="mxNoTomada"
                            type="checkbox"
                            name="mxNoTomada"
                            checked={props.mxNoTomada}
                            onChange={props.handleChangeMxNoTomada}
                            disabled={props.disableMxNoTomada}
                        /> Muestra no tomada
                                        </label>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="col-sm">
                    {/* <div>
                        <label>Hora toma</label>
                    </div> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/* <TimePicker
                            id="horaTomaMxUO1"
                            value={props.selectedHoraToma}
                            onChange={date => props.handleChangeHoraToma(date)}
                        /> */}
                        <KeyboardTimePicker
                            id="horaToma"
                            label="Hora toma"
                            mask="__:__ _M"
                            inputProps={{ autoComplete: 'off' }}
                            value={props.selectedHoraToma !== null ? props.selectedHoraToma : null}
                            onChange={date => props.handleChangeHoraToma(date)}
                        />
                    </MuiPickersUtilsProvider>
                    <div>
                        <label className="messageError">{props.errorHoraToma}</label>
                    </div>
                </div>

                <div className="col-sm">
                    {/* <label>Vol. del medio(ml)</label> */}
                    <TextField
                        id="volSangreMl"
                        autoComplete="off"
                        type="text"
                        style={{ marginTop: 13, width: '100%' }}
                        maxLength={50}
                        //className="form-control"
                        name="volSangreMl"
                        value={props.volSangre}
                        onChange={props.handleChangeVolSangre}
                        label="Volumen sangre(ml)" 
                        className={classes.textField}
                        helperText={props.errorVolSangre}/>
                    {/* <label style={{ marginTop: 10 }} className="messageError">{props.errorVolSangre}</label> */}
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="col-sm">
                    {/* <div>
                        <label>Hora refrigeración</label>
                    </div> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/* <TimePicker
                            id="horaRefriMxUO1"
                            value={props.selectedHoraRefrigeracion}
                            onChange={date => props.handleChangeHoraRefrigeracion(date)}
                        /> */}
                        <KeyboardTimePicker
                            id="horaRefri"
                            label="Hora refrigeración"
                            mask="__:__ _M"
                            inputProps={{ autoComplete: 'off' }}
                            value={props.selectedHoraRefrigeracion !== null ? props.selectedHoraRefrigeracion : null}
                            onChange={date => props.handleChangeHoraRefrigeracion(date)}
                        />
                    </MuiPickersUtilsProvider>
                    <div>
                        <label className="messageError">{props.errorHoraRefrigeracion}</label>
                    </div>
                </div>

                <div className="col-sm">
                <FormControl className={classes.formControl2}>
                        <InputLabel id="tomada-por-input-label">Tomada por</InputLabel>
                        <Select
                            labelId="tomada-por-label"
                            id="tomada-por-select"
                            value={props.selectedBioanalista}
                            onChange={props.handleChangeBionalista}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
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
            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-lg">
                    {/* <label>Observaciones</label> */}
                    <TextField
                        id="motivoNoMxUO1"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto', width: '100%' }}
                        maxLength={500}
                        multiline={true}
                        //className="form-control"
                        name="motivoNoMx"
                        value={props.motivoNoMx}
                        onChange={props.handleChangeMotivoNoMx}
                        label="Motivo no MX" 
                        disabled={props.disabledMotivoNoMx}
                        className={classes.textField}
                        helperText={props.errorMotivoNoMx}
                        />
                    {/* <label style={{ marginTop: 10 }} className="messageError">{props.errorMotivoNoMx}</label> */}
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-lg">
                    <TextField
                        id="motivoNoFif"
                        autoComplete="off"
                        type="text"
                        style={{ marginTop: 15, width: '100%' }}
                        //className="form-control"
                        name="motivoNoFif"
                        value={props.motivoNoFif}
                        onChange={props.handleChangeMotivoNoFif}
                        label="Motivo sin FIF"
                        className={classes.textField}
                        helperText={props.errorMotivoSinFif}
                        disabled={props.disabledMotivoNoFif} />
                    {/* <label style={{ marginTop: 10 }} className="messageError">{props.errorMotivoSinFif}</label> */}
                </div>
            </div>

            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-lg">
                    {/* <label>Observaciones</label> */}
                    <TextField
                        id="observationsUO1"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto' }}
                        maxLength={500}
                        multiline={true}
                        className="form-control"
                        name="observations"
                        value={props.observations}
                        onChange={props.handleChangeObservations}
                        label="Observaciones" />
                </div>
            </div>
        </>
    );
}
export default MxTransmisionParte2;