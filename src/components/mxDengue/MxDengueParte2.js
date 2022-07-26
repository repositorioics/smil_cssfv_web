import React from 'react';
//import { Multiselect } from 'multiselect-react-dropdown';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../mxDengue/MxDengue.css';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
} from '@material-ui/pickers';

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

const MxDengueParte2 = (props) => {
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
                        /> Se toma la muestra?
                    </label>
                </div>
                <div className="checkbox mleft-20">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="mxPapelFiltro"
                            type="checkbox"
                            name="mxPapelFiltro"
                            checked={props.mxPapelFiltro}
                            onChange={props.handleChangeMxPapelFiltro}
                            disabled={props.disabledMxPapelFiltro}
                        /> Se toma la mx papel filtro
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
            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-sm">
                    <FormControl className={classes.formControl}>
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
                <div className="col-sm">
                    {/* <div>
                        <label>Hora toma</label>
                    </div> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/* <TimePicker
                            id="horaToma"
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
                    {/* <div>
                        <label>Hora Refrigeración</label>
                    </div> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        {/* <TimePicker
                            id="horaRefrigeracion"
                            value={props.selectedHoraRefrigeracion}
                            onChange={date => props.handleChangeHoraRefrigeracion(date)}
                        /> */}
                        <KeyboardTimePicker
                            id="horaRefrigeracion"
                            label="Hora Refrigeración"
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
            </div>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="col-sm">
                    <TextField
                        id="volMedioMl"
                        autoComplete="off"
                        type="text"
                        style={{ width: '100%' }}
                        maxLength={50}
                        //className="form-control"
                        name="volMedioMl"
                        value={props.volMedioMl}
                        onChange={props.handleChangeVolMedioMl}
                        label="Vol. del medio(ml)" 
                        className={classes.textField}
                        helperText={props.errorVolMedio}/>
                    {/* <label style={{ marginTop: 10 }} className="messageError">{props.errorVolMedio}</label> */}
                </div>
                <div className="col-lg">
                    <TextField
                        id="motivoNoMx"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto' }}
                        maxLength={500}
                        multiline={true}
                        className="form-control"
                        name="motivoNoMx"
                        value={props.motivoNoMx}
                        onChange={props.handleChangeMotivoNoMx}
                        label="Motivo no MX"
                        disabled={props.disabledMotivoNoMx}
                    />
                    <label style={{ marginTop: 10 }} className="messageError">{props.errorMotivoNoMx}</label>
                </div>
            </div>
            {/* <div className="input-group row" style={{ marginTop: 5 }}>
                <div className="col-sm">
                    <TextField
                        id="motivoNoFif"
                        autoComplete="off"
                        type="text"
                        style={{ marginTop: 15, width: '475px' }}
                        className="form-control"
                        name="motivoNoFif"
                        value={props.motivoNoFif}
                        onChange={props.handleChangeMotivoNoFif}
                        label="Motivo sin FIF" 
                        disabled={props.disabledMotivoNoFif}/>
                        <label style={{ marginTop: 10 }} className="messageError">{props.errorMotivoSinFif}</label>
                </div>
            </div> */}
            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-lg">
                    {/* <label>Observaciones</label> */}
                    <TextField
                        id="observations"
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

export default MxDengueParte2;