import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import '../mxDengue/MxDengue.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 565,
        marginTop: 0
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

const MxDengueParte4 = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="checkbox mleft-20">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="mxPrDengue"
                            type="checkbox"
                            name="mxPrDengue"
                            checked={props.mxPrDengue}
                            onChange={props.handleChangeMxPrDengue}
                        /> Se realiza prueba rapida para Dengue?
                    </label>
                </div>
                <div className="checkbox mleft-20">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="procInmediato"
                            type="checkbox"
                            name="procInmediato"
                            checked={props.procInmediato}
                            onChange={props.handleChangeProcInmediato}
                        /> Procesamiento inmediato
                    </label>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-sm">
                    <TextField
                        id="numPrueba"
                        autoComplete="off"
                        type="number"
                        style={{ width: '100%' }}
                        maxLength={50}
                        name="numPrueba"
                        value={props.numPrueba}
                        onChange={props.handleChangeNumPrueba}
                        label="Numero de prueba"
                        className={classes.textField}
                        helperText={props.errorNumPrueba} />
                </div>
                <div className="col-sm">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="test-input-label">Seleccione el resultado</InputLabel>
                        <Select
                            labelId="test-label"
                            id="test-select"
                            value={props.selectedResult}
                            onChange={props.handleChangeResult}
                        >
                            <MenuItem value="0">
                                <em>None</em>
                            </MenuItem>
                            {props.dataResult.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.descripcion}</MenuItem>)
                            })
                            }
                        </Select>
                        <label style={{ marginTop: 3 }} className="messageError">{props.errorMessageResult}</label>
                    </FormControl>
                </div>
            </div>

            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-lg">
                    <TextField
                        id="observationsPrDengue"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto' }}
                        maxLength={500}
                        multiline={true}
                        className="form-control"
                        name="observationsPrDengue"
                        value={props.observationsPrDengue}
                        onChange={props.handleChangeObservationsPrDengue}
                        label="Observaciones" />
                </div>
            </div>
        </>
    );
}

export default MxDengueParte4;