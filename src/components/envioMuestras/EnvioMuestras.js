import 'date-fns';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import Select from '@material-ui/core/Select';
import Loading from '../loading/Loading';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import "./EnvioMuestras.css";
import { es } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 300,
        marginTop: 15
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    textField: {
        fontWeight: 'bold',
    },
    listItemText: {
        fontWeight: 'bold',
    }
}));

const EnvioMuestras = props => {
    const classes = useStyles();
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper className="container" elevation={3} >
                <div className="title">{props.titleForm}</div>
                <div className="input-group row">
                    <div className="col-sm">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="perfil-input-label">Seleccione la muestra</InputLabel>
                            <Select
                                labelId="perfil-por-label"
                                id="perfil-por-select"
                                value={props.selectedMuestra}
                                onChange={props.onSelect}
                            >
                                <MenuItem value="0">
                                    <em>Seleccione</em>
                                </MenuItem>
                                {props.muestrasData.map((e, keyIndex) => {
                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-sm">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="tomada-por-input-label">Bioanalista</InputLabel>
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
                <div className="input-group row">
                    <div className="col-sm">
                        <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                            <Grid container justify="space-between">
                                <div>
                                    <KeyboardDatePicker
                                        margin="normal"
                                        id="date-picker-dialog-date"
                                        label="Fecha"
                                        format="dd/MM/yyyy"
                                        autoOk={true}
                                        value={props.date !== null ? props.date : null}
                                        onChange={props.handleChangeDate}
                                        inputProps={{ autoComplete: 'off' }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                    <label className="messageError">{props.errorDate}</label>
                                </div>
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className="col-sm" style={{ marginTop: 15 }}>
                        {/* <div>
                            <label>Hora</label>
                        </div> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            {/* <TimePicker
                                id="hora"
                                label="Hora"
                                value={props.selectedHora}
                                onChange={date => props.handleChangeHora(date)}
                            /> */}
                            <KeyboardTimePicker
                                id="hora"
                                label="Hora"
                                mask="__:__ _M"
                                inputProps={{ autoComplete: 'off' }}
                                value={props.selectedHora !== null ? props.selectedHora : null}
                                onChange={date => props.handleChangeHora(date)}
                            />
                        </MuiPickersUtilsProvider>
                        <div>
                            <label className="messageError">{props.errorHora}</label>
                        </div>
                    </div>
                    <div className="col-sm" style={{ marginTop: 2 }}>
                        <TextField
                            id="temp"
                            autoComplete="off"
                            style={{ marginTop: 13, width: '100%' }}
                            maxLength={50}
                            //className="form-control"
                            name="temp"
                            type="number"
                            value={props.temp}
                            onChange={props.handleChangeTemp}
                            label="Temp. (°C)"
                            className={classes.textField}
                            InputProps={{ inputProps: { min: 1, max: 15 } }}
                            FormHelperTextProps={{ className: 'messageError' }}
                            helperText={props.errorTemp} />

                    </div>
                    <div className="col-sm" style={{ marginTop: 2 }}>
                        <TextField
                            id="viaje"
                            autoComplete="off"
                            type="number"
                            pattern="^\d*(\.\d{0,2})?$"
                            style={{ marginTop: 13, width: '100%' }}
                            maxLength={50}
                            //className="form-control"
                            name="viaje"
                            value={props.viaje}
                            onChange={props.handleChangeViaje}
                            label="Viaje"
                            className={classes.textField}
                            helperText={props.errorViaje} />
                    </div>
                    
                </div>
                <div className='envioMuestra'>
                    <div></div>
                    <div className='envioMuestra2'>
                        <div></div>
                        <div>
                            <h4>Muestras</h4>
                            <div className="container" style={{ boxShadow: 'none' }}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table">
                                            <thead className='theadTbody'>
                                                <tr>
                                                    <th scope="col">
                                                        <input
                                                            type="checkbox"
                                                            className="custom-checkbox"
                                                            checked={props.masterChecked}
                                                            onChange={(e) => props.onMasterCheck(e)}
                                                            id="mastercheck"

                                                        />
                                                    </th>
                                                    <th style={{ width: 140, paddingLeft: 25 }} scope="col">Muestra</th>
                                                    <th style={{ width: 140, paddingLeft: 25 }} scope="col">Código Lab</th>
                                                    <th style={{ width: 140, paddingLeft: 25 }} scope="col">Fecha Toma</th>
                                                </tr>
                                            </thead>
                                            <tbody className='theadTbody cTbody'>
                                                {props.data.map((mx) => (
                                                    <tr key={mx.muestraId}>
                                                        <th scope="row">
                                                            <input
                                                                type="checkbox"
                                                                checked={mx.estado}
                                                                className="custom-checkbox"
                                                                id="rowcheck{mx.muestraId}"
                                                                onChange={(e) => props.onItemCheck(e, mx)}

                                                            />
                                                        </th>
                                                        <td style={{ width: 140 }}>{mx.muestra}</td>
                                                        <td style={{ width: 140 }}>{mx.codLab}</td>
                                                        <td style={{ width: 140 }}>{mx.fechaToma}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4>Muestras a enviar</h4>
                            <div className="container" style={{ boxShadow: 'none' }}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table">
                                            <thead className='theadTbody'>
                                                <tr>
                                                    <th style={{ width: 140, paddingLeft: 45 }} scope="col">Muestra</th>
                                                    <th style={{ width: 140, paddingLeft: 45 }} scope="col">Código Lab</th>
                                                    <th style={{ width: 140, paddingLeft: 45 }} scope="col">Fecha Toma</th>
                                                </tr>
                                            </thead>
                                            <tbody className='theadTbody cTbody'>
                                                {props.listToSave.map((mx) => (
                                                    <tr key={mx.muestraId}>
                                                        <th scope="row">
                                                            <input
                                                                type="checkbox"
                                                                checked={mx.removeFromList}
                                                                className="custom-checkbox"
                                                                id="rowcheck{mx.muestraId}"
                                                                onChange={(e) => props.onItemCheckRemove(e, mx)}

                                                            />
                                                        </th>
                                                        <td style={{ width: 140 }}>{mx.muestra}</td>
                                                        <td style={{ width: 140 }}>{mx.codLab}</td>
                                                        <td style={{ width: 140 }}>{mx.fechaToma}</td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div hidden={false}>
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Guardar</Tooltip>}>
                            <button className="btn-cricle" onClick={props.saveData}>
                                <SaveIcon />
                            </button>
                        </OverlayTrigger>
                    </div>
                </div>
                {/*  */}
            </Paper>
        </>
    );
}

export default EnvioMuestras;