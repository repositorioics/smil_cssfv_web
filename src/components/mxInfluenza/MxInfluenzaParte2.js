import React from 'react';
//import { Multiselect } from 'multiselect-react-dropdown';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../mxInfluenza/MxInfluenza.css';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
                            
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
}));

const MxInfluenzaParte2 = (props) => {
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
                        /> Muestra tomada
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
                <div className="checkbox mleft-20">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="esRetoma"
                            type="checkbox"
                            name="esRetoma"
                            checked={props.esRetoma}
                            onChange={props.handleChangeEsRetoma}
                            disabled={props.disabledEsRetoma}
                        /> Es retoma?
                                        </label>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 15 }}>
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
                <div className="col-sm">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="tipo-muestra-input-label">Tipo de muestra</InputLabel>
                        <Select
                            labelId="tipo-muestra-label"
                            id="tipo-muestra-select"
                            value={props.selectedTypeOfMx}
                            onChange={props.onSelectTypeOfMx}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.typeMx.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                            })
                            }
                        </Select>
                        <label className="messageError">{props.errorTypeOfMx}</label>
                    </FormControl>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="col-sm">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                    <TextField
                        id="volMedioMl"
                        autoComplete="off"
                        type="text"
                        style={{ marginTop: 10, width: '100%' }}
                        maxLength={50}
                        className="form-control"
                        name="volMedioMl"
                        value={props.volMedioMl}
                        onChange={props.handleChangeVolMedioMl}
                        label="Vol. del medio(ml)" />
                    <label style={{ marginTop: 10 }} className="messageError">{props.errorVolMedio}</label>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 5 }}>
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
                <div className="col-sm">
                    <FormControl className={classes.formControl} disabled={props.disabledMismoEpFebril}>
                        <InputLabel id="mismo-ep-febril">Motivo mismo episodio FIF</InputLabel>
                        <Select
                            labelId="mismo-ep-febril-label"
                            id="mismo-ep-febril-select"
                            value={props.selectedMismoEpFif}
                            onChange={props.onSelectMismoEpFif}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.mismoEpFif.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                            })
                            }
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 15 }}>
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
            <div className="input-group row" style={{ marginTop: 15 }}>
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
                        value={props.observations}
                        onChange={props.handleChangeObservations}
                        label="Observaciones" />
                </div>
            </div>
        </>
    );
}

export default MxInfluenzaParte2;