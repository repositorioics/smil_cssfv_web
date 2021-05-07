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
        minWidth: 475,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const MxInfluenzaParte3 = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="checkbox mleft-20" style={{ marginTop: 20 }}>
                    <label>
                        <input
                            className="custom-checkbox"
                            id="prFlu"
                            type="checkbox"
                            name="prFlu"
                            checked={props.prFlu}
                            onChange={props.handleChangePrFlu}
                            disabled={props.isMxCv}
                        /> Se Realiza prueba rápida de Influenza?
                            </label>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 20 }}>
                <div className="col-sm">
                    {/* <label>Número de prueba</label> */}
                    <TextField
                        id="testNumberFlu"
                        autoComplete="off"
                        type="number"
                        maxLength={50}
                        className="form-control"
                        name="testNumberFlu"
                        value={props.testNumberFlu}
                        onChange={props.handleChangeTestNumberFlu}
                        disabled={props.isMxCv}
                        label="Número de prueba" />
                    <label style={{marginTop: 10}} className="messageError">{props.errorTestNumberFlu}</label>
                </div>
                <div className="col-sm">
                    {/* <label>Resultado</label> */}
                    {/* <TextField
                        id="testResultFlu"
                        autoComplete="off"
                        type="text"
                        maxLength={50}
                        className="form-control"
                        name="testResultFlu"
                        value={props.testResultFlu}
                        onChange={props.handleChangeTesResultFlu}
                        disabled={props.isMxCv}
                        label="Resultado" /> */}
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
                        <label style={{marginTop: 3}} className="messageError">{props.errorMessageResult}</label>
                    </FormControl>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 15 }}>
                <div className="col-lg">
                    {/* <label>Observaciones</label> */}
                    <TextField
                        id="observationsPr"
                        autoComplete="off"
                        type="text"
                        maxLength={500}
                        style={{ height: 'auto' }}
                        multiline={true}
                        className="form-control"
                        name="observationsPr"
                        value={props.observationsPr}
                        onChange={props.handleChangeObservationsPr}
                        disabled={props.isMxCv}
                        label="Observaciones" />
                </div>
            </div>
        </>
    );
}

export default MxInfluenzaParte3;