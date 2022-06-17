import React from 'react';
//import { Multiselect } from 'multiselect-react-dropdown';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    TimePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { es } from 'date-fns/locale';
import '../mxDengue/MxDengue.css';


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

const MxDengueParte3 = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="checkbox mleft-20">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="mxSeparada"
                            type="checkbox"
                            name="mxSeparada"
                            checked={props.mxSeparada}
                            onChange={props.handleChangeMxSeparada}
                        /> Se separa la muestra?
                    </label>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-sm">
                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                        <Grid container justify="space-between">
                            <div style={{ marginRight: 36 }}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog-fSeparacion"
                                    label="Fecha de separacion"
                                    format="dd/MM/yyyy"
                                    autoOk={true}
                                    value={props.fechaSeparacion !== null ? props.fechaSeparacion : null}
                                    onChange={props.handleChangeFSeparacion}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <label className="messageError row">{props.errorFechaSeparacion}</label>
                            </div>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div className="col-sm">
                    <div>
                        <label>Hora de separación</label>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            id="horaSeparacion"
                            value={props.selectedHoraSeparacion}
                            onChange={date => props.handleChangeHoraSeparacion(date)}
                        />
                    </MuiPickersUtilsProvider>
                    <div>
                        <label className="messageError">{props.errorHoraSeparacion}</label>
                    </div>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-sm">
                    <TextField
                        id="viales"
                        autoComplete="off"
                        type="text"
                        style={{ width: '100%' }}
                        maxLength={50}
                        name="viales"
                        value={props.viales}
                        onChange={props.handleChangeViales}
                        label="Viales" 
                        className={classes.textField}
                        helperText={props.errorViales}/>
                </div>

                <div className="col-sm">
                    <TextField
                        id="volumenSuero"
                        autoComplete="off"
                        type="text"
                        style={{ width: '100%' }}
                        maxLength={50}
                        name="volumenSuero"
                        value={props.volumenSuero}
                        onChange={props.handleChangeVolumenSuero}
                        label="Volumen suero(ml)" 
                        className={classes.textField}
                        helperText={props.errorVolumenSuero}/>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
            <div className="col-sm">
                    <div>
                        <label>Hora refrigeración vial</label>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            id="horaRefVial"
                            value={props.selectedHoraRefVial}
                            onChange={date => props.handleChangeHoraRefVial(date)}
                        />
                    </MuiPickersUtilsProvider>
                    <div>
                        <label className="messageError">{props.errorHoraRefVial}</label>
                    </div>
                </div>
                <div className="col-sm">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="separada-por-input-label">Separada por</InputLabel>
                        <Select
                            labelId="separada-por-label"
                            id="separada-por-select"
                            value={props.selectedBioanalistaVial}
                            onChange={props.handleChangeBionalistaVial}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.bioanalistas.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                            })
                            }
                        </Select>
                        <label className="messageError">{props.errorBioanlistaVial}</label>
                    </FormControl>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-lg">
                    <TextField
                        id="observations"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto' }}
                        maxLength={500}
                        multiline={true}
                        className="form-control"
                        name="observations"
                        value={props.observationsMxSeparada}
                        onChange={props.handleChangeObservationsMxSeparada}
                        label="Observaciones" />
                </div>
            </div>
        </>
    );
}

export default MxDengueParte3;