import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../mxInfluenza/MxInfluenza.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 565,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const MxInfluenzaParte4 = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className="input-group row">
                <div className="checkbox mleft-20" style={{ marginTop: 20 }}>
                    <label>
                        <input
                            className="custom-checkbox"
                            id="prVsr"
                            type="checkbox"
                            name="prVsr"
                            checked={props.prVsr}
                            onChange={props.handleChangePrVsr}
                            disabled={props.isMxCv}
                        /> Se Realiza prueba rápida para VSR?
                            </label>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="col-sm">
                    {/* <label>Número de prueba</label> */}
                    <TextField
                        id="testNumberVsr"
                        autoComplete="off"
                        type="number"
                        maxLength={50}
                        className="form-control"
                        style={{ width: '475px' }}
                        name="testNumberVsr"
                        value={props.testNumberVsr}
                        onChange={props.handleChangeTestNumberVsr}
                        disabled={props.isMxCv}
                        label="Número de prueba" />
                        <label style={{marginTop: 10}} className="messageError">{props.errorTestNumberFluVsr}</label>
                </div>
                <div className="col-sm">
                    {/* <label>Resultado</label> */}
                    {/* <TextField
                        id="testResultVsr"
                        autoComplete="off"
                        type="text"
                        maxLength={50}
                        className="form-control"
                        name="testResultVsr"
                        value={props.testResultVsr}
                        onChange={props.handleChangeTesResultVsr}
                        disabled={props.isMxCv}
                        label="Resultado" /> */}
                        <FormControl className={classes.formControl}>
                        <InputLabel id="test-input-label">Seleccione el resultado</InputLabel>
                        <Select
                            labelId="test-label-vsr"
                            id="test-select-vsr"
                            value={props.testResultVsr}
                            onChange={props.handleChangeTesResultVsr}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.dataResultVsr.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.descripcion}</MenuItem>)
                            })
                            }
                        </Select>
                        <label style={{marginTop: 3}} className="messageError">{props.errorMessageResultVsr}</label>
                    </FormControl>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-lg">
                    {/* <label>Observaciones</label> */}
                    <TextField
                        id="observationsPrVsr"
                        autoComplete="off"
                        type="text"
                        maxLength={500}
                        style={{ height: 'auto' }}
                        multiline={true}
                        className="form-control"
                        name="observationsPrVsr"
                        value={props.observationsPrVsr}
                        onChange={props.handleChangeObservationsPrVsr}
                        disabled={props.isMxCv}
                        label="Observaciones" />
                </div>
            </div>
        </>
    );
}

export default MxInfluenzaParte4;