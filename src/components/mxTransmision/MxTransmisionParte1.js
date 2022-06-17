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
import '../mxTransmision/MxTransmision.css';
import { es } from 'date-fns/locale';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 475,
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

const MxTransmisionParte1 = props => {
    const classes = useStyles();
    return (
        <>
            <div className="input-group row" style={{ marginTop: 5 }}>
                <div className="col-sm">
                    {/* <label>Código</label> */}
                    <TextField
                        id="codeTransmision"
                        autoFocus
                        autoComplete="off"
                        type="number"
                        maxLength={10}
                        //className="form-control"
                        style={{ width: 150 }}
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
                        label="Código"
                        className={classes.textField}
                        helperText={props.errorCode}/>
                    {/* <label style={{ marginTop: 10 }} className="messageError">{props.errorCode}</label> */}
                </div>
                <div className="checkbox col-sm">
                    <label>
                        <input
                            className="custom-checkbox"
                            id="plasma"
                            type="checkbox"
                            name="plasma"
                            checked={props.plasma}
                            onChange={props.handleChangePlasma}
                        /> Plasma
                    </label>
                </div>
                <div className="col col-lg-2">
                    <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Imprimir código</Tooltip>}>
                        <span className="d-inline-block">
                            <PrintIcon style={{ color: blue[500], cursor: 'pointer' }} size={20} onClick={props.printCode} />
                        </span>
                    </OverlayTrigger>
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-sm">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="test-input-tipo-tubo">Tipo de tubo</InputLabel>
                        <Select
                            labelId="request-label"
                            id="request-select"
                            value={props.selectedTubo}
                            onChange={props.handleChangeTipoTubo}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.tipoTubo.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.descripcion}</MenuItem>)
                            })
                            }
                        </Select>
                        <label className="messageError">{props.errorTubo}</label>
                    </FormControl>
                </div>
                <div className="col-sm">
                    {/* <label>Cod-lab scan</label> */}
                    <TextField
                        id="codeLabScan"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto', marginTop: 20 }}
                        maxLength={50}
                        className="form-control"
                        name="codeLabScan"
                        value={props.codeLabScan}
                        readOnly={true}
                        /* onChange={props.handleChangeCodeLabScan} */
                        label="Cod-lab scan" />
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-sm">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="test-input-clasfi">Visita</InputLabel>
                        <Select
                            labelId="request-label-clasfi"
                            id="request-select-clasfi"
                            value={props.selectedVisita}
                            onChange={props.handleChangeVisita}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.visitas.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                            })
                            }
                        </Select>
                        <label className="messageError">{props.errorVisita}</label>
                    </FormControl>
                </div>
                <div className="col-sm">
                    {/* <label>Código de lab</label> */}
                    <TextField
                        id="houseCode"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto', marginTop: 20 }}
                        maxLength={50}
                        className="form-control"
                        name="houseCode"
                        value={props.houseCode}
                        readOnly={true}
                        inputProps={{
                            style: { fontWeight: 'bold' }
                        }}
                        /* onChange={props.handleChangeHousCode} */
                        label="Casa CHF" />
                </div>
            </div>
            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-sm">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="test-input-label-request">Solicitada por</InputLabel>
                        <Select
                            labelId="request-label"
                            id="request-select"
                            value={props.selectedMedico}
                            onChange={props.handleChangeMedico}
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
                    {/* <label>Código de lab</label> */}
                    <TextField
                        id="codLab"
                        autoComplete="off"
                        type="text"
                        style={{ height: 'auto', marginTop: 20 }}
                        maxLength={50}
                        className="form-control"
                        name="codLab"
                        value={props.codLab}
                        readOnly={true}
                        inputProps={{
                            style: { fontWeight: 'bold' }
                        }}
                        /* onChange={props.handleChangeCodeLab} */
                        label="Código de lab" />
                </div>
            </div>
            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                <Grid container>
                    <div className="col-sm">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-fif-u01"
                            label="FIF"
                            format="dd/MM/yyyy"
                            autoOk={true}
                            value={props.fif !== null ? props.fif : null}
                            onChange={props.handleChangeFif}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <label className="messageError row">{props.errorFif}</label>
                    </div>
                    {/* <div>
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-fis-u01"
                            label="FIS"
                            format="dd/MM/yyyy"
                            autoOk={true}
                            value={props.fis !== null ? props.fis : null}
                            onChange={props.handleChangeFis}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <label className="messageError row">{props.errorFis}</label>
                    </div> */}
                    <div className="col-sm">
                        <KeyboardDatePicker
                            margin="normal"
                            id="date-picker-dialog-fToma-u01"
                            label="Fecha toma"
                            format="dd/MM/yyyy"
                            autoOk={true}
                            value={props.fechaToma !== null ? props.fechaToma : null}
                            onChange={props.handleChangeFtoma}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <label className="messageError row">{props.errorFechaToma}</label>
                    </div>
                </Grid>
            </MuiPickersUtilsProvider>

            <div className="input-group row" style={{ marginTop: 10 }}>
                <div className="col-5">
                    {/* <label>Nombre del participante</label> */}
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
                    {/* <label>Estudio</label> */}
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
                    {/* <label>Edad</label> */}
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
        </>
    );
}
export default MxTransmisionParte1;