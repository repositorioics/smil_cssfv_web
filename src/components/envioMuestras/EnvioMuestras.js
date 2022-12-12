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
import Box from '@mui/material/Box';
import Tooltip2 from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardTimePicker
} from '@material-ui/pickers';
import SaveIcon from '@material-ui/icons/Save';
import Checkbox from '@mui/material/Checkbox';
import "./EnvioMuestras.css";
import { es } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 330,
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
    },
    textField2: {
        fontWeight: 'bold',
        color: '#2E3B55'
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const EnvioMuestras = props => {
    const classes = useStyles();
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper elevation={3} style={{ height: 'auto', paddingBottom: 50 }}>
                <div style={{ marginLeft: 10 }} className="title">{props.titleForm}</div>
                <div className="input-group row">
                    <div style={{ marginLeft: 10 }} className="col-sm">
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
                    <div className="col-sm" style={{ marginLeft: 10 }}>
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
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                            name="viaje"
                            value={props.viaje}
                            onChange={props.handleChangeViaje}
                            label="Viaje"
                            className={classes.textField}
                            helperText={props.errorViaje} />
                    </div>
                </div>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <Item>
                                    <h6 className={classes.textField2}>PBMC</h6>
                                    <div className="col-md-16">
                                        <table className="table">
                                            <thead className='theadTbody'>
                                                <tr>
                                                    <th scope="col">
                                                        <Tooltip2 title="Seleccionar todos los pbmc">
                                                            <input
                                                                id="chkAllPbmc"
                                                                type="checkbox"
                                                                className="custom-checkboxAll"
                                                                checked={props.chkAllPbmc}
                                                                onChange={(e) => props.onCheckAllPbmc(e)}
                                                            />
                                                        </Tooltip2>
                                                    </th>
                                                    <th style={{ width: 140 }} scope="col">Código</th>
                                                    <th style={{ width: 140 }} scope="col">Estudio</th>
                                                    <th style={{ width: 140 }} scope="col">CodLab</th>
                                                    <th style={{ width: 140 }} scope="col">F.Toma</th>
                                                </tr>
                                            </thead>
                                            <tbody className='theadTbody cTbody'>
                                                {props.dataPbmc.map((mx) => (
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
                                                        <td style={{ width: 140 }}>{mx.codigo}</td>
                                                        <td style={{ width: 140 }}>{mx.estudio}</td>
                                                        <td style={{ width: 140 }}>{mx.codLab}</td>
                                                        <td style={{ width: 140 }}>{mx.fechaToma}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Item>
                                {props.dataPbmc.length > 0 ?
                                    <span className='messageError'><span>PBMC seleccionados </span>{props.dataPbmc.filter(x => x.estado === true).length}/{props.dataPbmc.length}</span>
                                    : null}
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                    <h6 className={classes.textField2}>ROJO</h6>
                                    <div className="col-md-16">
                                        <table className="table">
                                            <thead className='theadTbody'>
                                                <tr>
                                                    <th scope="col">
                                                        <Tooltip2 title="Seleccionar todos los tubo rojo">
                                                            <input
                                                                id="chkAllPbmc"
                                                                type="checkbox"
                                                                className="custom-checkboxAll"
                                                                checked={props.chkAllTRojo}
                                                                onChange={(e) => props.onCheckAllTRojo(e)}
                                                            />
                                                        </Tooltip2>
                                                    </th>
                                                    <th style={{ width: 140 }} scope="col">Código</th>
                                                    <th style={{ width: 140 }} scope="col">Estudio</th>
                                                    <th style={{ width: 140 }} scope="col">CodLab</th>
                                                    <th style={{ width: 140 }} scope="col">F.Toma</th>
                                                </tr>
                                            </thead>
                                            <tbody className='theadTbody cTbody'>
                                                {props.dataRojo.map((mx) => (
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
                                                        <td style={{ width: 140 }}>{mx.codigo}</td>
                                                        <td style={{ width: 140 }}>{mx.estudio}</td>
                                                        <td style={{ width: 140 }}>{mx.codLab}</td>
                                                        <td style={{ width: 140 }}>{mx.fechaToma}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Item>
                                {props.dataRojo.length > 0 ?
                                    <span className='messageError'><span>ROJOS seleccionados </span>{props.dataRojo.filter(x => x.estado === true).length}/{props.dataRojo.length}</span>
                                    : null}
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                    <h6 className={classes.textField2}>HISOPADOS</h6>
                                    <div className="col-md-16">
                                        <table className="table">
                                            <thead className='theadTbody'>
                                                <tr>
                                                    <th scope="col">
                                                        <Tooltip2 title="Seleccionar todos los hisopados">
                                                            <input
                                                                id="chkAllPbmc"
                                                                type="checkbox"
                                                                className="custom-checkboxAll"
                                                                checked={props.chkAllHisopados}
                                                                onChange={(e) => props.onCheckAllHisopados(e)}
                                                            />
                                                        </Tooltip2>
                                                    </th>
                                                    <th style={{ width: 140 }} scope="col">Código</th>
                                                    <th style={{ width: 140 }} scope="col">Estudio</th>
                                                    <th style={{ width: 140 }} scope="col">CodLab</th>
                                                    <th style={{ width: 140 }} scope="col">F.Toma</th>
                                                </tr>
                                            </thead>
                                            <tbody className='theadTbody cTbody'>
                                                {props.dataHisopados.map((mx) => (
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
                                                        <td style={{ width: 140 }}>{mx.codigo}</td>
                                                        <td style={{ width: 140 }}>{mx.estudio}</td>
                                                        <td style={{ width: 140 }}>{mx.codLab}</td>
                                                        <td style={{ width: 140 }}>{mx.fechaToma}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </Item>
                                {props.dataHisopados.length > 0 ?
                                    <span className='messageError'><span>HISOPADOS seleccionados </span>{props.dataHisopados.filter(x => x.estado === true).length}/{props.dataHisopados.length}</span>
                                    : null}
                            </Grid>
                            <div>
                                <label style={{marginLeft: 10, fontWeight: 'bold', fontFamily: 'Roboto, Helvetica, Arial, sans-serif !important', fontSize: 12}}>
                                    <Checkbox
                                        checked={props.checkAddMxEnvio}
                                        onChange={props.handleChangeAddMxEnvio}
                                        label="Top"
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />Desea agregar mx a envio realizado?
                                </label>
                            </div>
                        </Grid>
                    </Box>
                </div>
                <div className="row">
                    <div className="col-sm" style={{ marginTop: 2 }}>
                        <div hidden={false}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Realizar envio</Tooltip>}>
                                <button className="btn-cricle" onClick={props.saveData}>
                                    <SaveIcon />
                                </button>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </Paper>
        </>
    );
}

export default EnvioMuestras;