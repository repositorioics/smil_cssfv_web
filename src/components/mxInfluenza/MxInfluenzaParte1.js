import 'date-fns';
import React from 'react';
//import { Multiselect } from 'multiselect-react-dropdown';
import TextField from '@material-ui/core/TextField';
import PrintIcon from '@material-ui/icons/Print';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { blue } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../mxInfluenza/MxInfluenza.css';
import { es } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 475,
        marginTop: 15
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    textField: {
        fontWeight: 'bold',
    },

}));

const MxInfluenzaParte1 = props => {
    const classes = useStyles();
    return (
        <form>
            <div className="input-group row" style={{ marginTop: 5 }}>
                <div className="col" style={{ width: 150 }}>
                    <TextField
                        id="code"
                        autoFocus
                        autoComplete="off"
                        type="number"
                        maxLength={10}
                        className="form-control"
                        name="code"
                        value={props.code}
                        onChange={props.handleChangeCode}
                        onKeyPress={props.onKeyPressCode}
                        disabled={props.disableCode}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                style: { fontWeight: 'bold' }
                            }
                        }}
                        label="C??digo" />
                    <label style={{ marginTop: 10 }} className="messageError">{props.errorCode}</label>
                </div>
                <div className="checkbox mleft-20 col">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="mxCovid"
                            type="checkbox"
                            name="mxCovid"
                            checked={props.mxCv}
                            onChange={props.handleChangeMxCv}
                        /> Mx Covid
                    </label>
                </div>
                <div className="col col-lg-2">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Imprimir c??digo</Tooltip>}>
                        <span className="d-inline-block">
                            <PrintIcon style={{ color: blue[500], cursor: 'pointer' }} size={20} onClick={props.abrirImpresion} />
                        </span>
                    </OverlayTrigger>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
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
                                <em>Seleccione</em>
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
                    <TextField
                        id="codeLabScan"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto', marginTop: 20 }}
                        maxLength={50}
                        className="form-control"
                        name="codeLabScan"
                        value={props.codeLabScan}
                        disabled={props.disabledCodeLabScan}
                        inputProps={{
                            style: { fontWeight: 'bold' }
                        }}
                        label="Cod-lab scan" />
                </div>
            </div>
            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                <Grid container justify="space-between">
                    <div>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-fif"
                            label="FIF"
                            format="dd/MM/yyyy"
                            autoOk={true}
                            value={props.fif !== null ? props.fif : null}
                            onChange={props.handleChangeFif}
                            onKeyDown={props.onKeyPressFif}
                            inputProps={{ autoComplete: 'off' }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <label className="messageError row">{props.errorFif}</label>
                    </div>
                    <div>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-fis"
                            label="FIS"
                            format="dd/MM/yyyy"
                            autoOk={true}
                            value={props.fis !== null ? props.fis : null}
                            onChange={props.handleChangeFis}
                            //onKeyPress={props.onKeyPressFis}
                            inputProps={{ autoComplete: 'off' }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <label className="messageError row">{props.errorFis}</label>
                    </div>
                    <div style={{ marginRight: 36 }}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-fToma"
                            label="Fecha toma"
                            format="dd/MM/yyyy"
                            autoOk={true}
                            value={props.fechaToma !== null ? props.fechaToma : null}
                            onChange={props.handleChangeFtoma}
                            inputProps={{ autoComplete: 'off' }}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <label className="messageError row">{props.errorFechaToma}</label>
                    </div>
                </Grid>
            </MuiPickersUtilsProvider>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-sm">
                    <FormControl className={classes.formControl} disabled={props.disableTypeOfTest}> 
                        <InputLabel id="test-input-label">Tipo de prueba</InputLabel>
                        <Select
                            labelId="test-label"
                            id="test-select"
                            value={props.selectedTypeOfTest}
                            onChange={props.handleChangeTypeOfTest}
                            
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.dataTypeOfTest.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.descripcion}</MenuItem>)
                            })
                            }
                        </Select>
                        <label className="messageError">{props.errorTypeOfTest}</label>
                    </FormControl>
                </div>
                <div className="col-sm">
                    <TextField
                        id="codeLab"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto', marginTop: 20 }}
                        maxLength={50}
                        className="form-control"
                        name="codeLab"
                        value={props.codeLab}
                        readOnly={true}
                        inputProps={{
                            style: { fontWeight: 'bold' }
                        }}
                        label="C??digo de lab" />
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-5">
                    <TextField
                        id="name"
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
                    <TextField
                        id="study"
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
                    <TextField
                        id="age"
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
        </form>
    );
}
export default MxInfluenzaParte1;