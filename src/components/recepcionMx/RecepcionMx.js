import 'date-fns';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    TimePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { es } from 'date-fns/locale';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { red } from '@material-ui/core/colors';
import Loading from '../loading/Loading';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@material-ui/core/Button';
import '../recepcionMx/RecepcionMx.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '98%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        fontWeight: 'bold',
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    title: {
        fontSize: '2rem',
        marginLeft: '10px',
        paddingBottom: '5px',
        paddingTop: '10px',
        fontWeight: 'bold',
    },

    subTitle: {
        fontSize: '10px',
        marginLeft: '10px',
        paddingBottom: '2px',
        paddingTop: '2px',
        color: '#A82400',
        fontWeight: 'bold',
    },
    fabColor: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        color: theme.palette.common.white,
        backgroundColor: red[900],
        '&:hover': {
            backgroundColor: red[600],
        },
    },
    button: {
        marginLeft: theme.spacing(5),
        //position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    formControl: {
        minWidth: '100%',
        marginTop: 0
    },
    formControl2: {
        minWidth: '48%',
        marginTop: 0
    }
}));

function Item(props) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#fff'),
                color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#fff'),
                border: '1px solid',
                borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#fff' : '#fff',
                p: 1,
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

Item.propTypes = {
    sx: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
        ),
        PropTypes.func,
        PropTypes.object,
    ]),
};

const RecepcionMx = props => {
    const classes = useStyles();
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper elevation={3} style={{ width: '100%', paddingBottom: 20 }}>
                <div className="row">
                    <div className="col-sm">
                        <div className={classes.title}>
                            <h4>{props.title}</h4>
                        </div>
                        <div className={classes.subTitle}>
                            <span>{props.subTitle2}</span>
                        </div>
                        <div className={classes.subTitle}>
                            <span>{props.subTitle1}</span>
                        </div>
                    </div>
                </div>
                <Grid container spacing={2} style={{ paddingTop: 0 }}>
                    <Grid item xs={8}>
                        <Item>
                            <div className="col-sm">
                                <TextField
                                    id="codeLabScan"
                                    autoComplete="off"
                                    type="text"
                                    style={{ height: 'auto' }}
                                    maxLength={50}
                                    className="form-control"
                                    name="codeLabScan"
                                    value={props.codeLabScan}
                                    onChange={props.onChangeBarcode}
                                    onKeyDown={props.onKeyPressBarcode}
                                    disabled={props.disabledCodeLabScan}
                                    label="Cod-lab scan" />
                            </div>
                        </Item>
                        <Item>
                            <div className="col-sm">
                                {/* <label>Nombre del participante</label> */}
                                <TextField
                                    id="nameRecep"
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
                        </Item>
                        <Item>
                            <div className="col-5">
                                <TextField
                                    id="codeRecep"
                                    autoComplete="off"
                                    type="text"
                                    maxLength={10}
                                    style={{ height: 'auto' }}
                                    className="form-control"
                                    name="code"
                                    value={props.code}
                                    readOnly={true}
                                    inputProps={{
                                        style: { fontWeight: 'bold', backgroundColor: 'none' }
                                    }}
                                    label="Código" />
                            </div>
                        </Item>
                        <Item>
                            <Grid container justify="space-between">
                                <div className="col-sm">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="test-input-label-request">Solicitado por</InputLabel>
                                        <Select
                                            labelId="request-label"
                                            id="request-select"
                                            value={props.selectedRequestBy}
                                            onChange={props.handleChaneSelectRequestBy}
                                        >
                                            <MenuItem value="0">
                                                <em>Seleccione</em>
                                            </MenuItem>
                                            {props.medicos.map((e, keyIndex) => {
                                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                            })
                                            }
                                        </Select>
                                        <label className="messageError">{props.errorRequestBy}</label>
                                    </FormControl>
                                </div>
                                <div className="col-sm">
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="tomada-por-input-label">Laboratorista</InputLabel>
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
                            </Grid>
                        </Item>
                        <Item>
                            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                <Grid container justify="space-between">
                                    <div className="col-sm">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog-fis"
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
                                    </div>
                                    <div className="col-sm" style={{ marginRight: 36 }}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog-fToma"
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
                        </Item>
                        <Item>
                            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                <Grid container justify="space-between">
                                    <div className="col-sm" style={{ marginTop: 15, marginLeft: 10 }}>
                                        <TimePicker
                                            id="horaTomaRecepMx"
                                            label="Hora toma"
                                            value={props.selectedHoraToma}
                                            onChange={date => props.handleChangeHoraToma(date)}
                                        />
                                        <div>
                                            <label className="messageError">{props.errorHoraToma}</label>
                                        </div>
                                    </div>
                                    <div className="col-sm" style={{ marginTop: 15 }}>
                                        <TimePicker
                                            id="horaRefrigeracionRecepMx"
                                            label="Hora refrigeración"
                                            value={props.selectedHoraRefrigeracion}
                                            onChange={date => props.handleChangeHoraRefrigeracion(date)}
                                        />
                                        <div>
                                            <label className="messageError">{props.errorHoraRefrigeracion}</label>
                                        </div>
                                    </div>
                                    <div className="col-sm">
                                        <TextField
                                            id="volMedioMlRecep"
                                            autoComplete="off"
                                            type="text"
                                            style={{ marginTop: 15 }}
                                            maxLength={50}
                                            name="volMedioMl"
                                            value={props.volMedioMl}
                                            onChange={props.handleChangeVolMedioMl}
                                            label="Vol. del medio(ml)"
                                        />
                                        <div>
                                            <label className="messageError">{props.errorVolMedio}</label>
                                        </div>
                                    </div>

                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Item>
                        <Item>
                            <div className="col-sm">
                                <FormControl className={classes.formControl2}>
                                    <InputLabel id="recepciona-input-label">Recepciona</InputLabel>
                                    <Select
                                        labelId="recepciona-label"
                                        id="recepciona-select"
                                        value={props.selectedBioanalistaRecepciona}
                                        onChange={props.handleChangeBionalistaRecepciona}
                                    >
                                        <MenuItem value="0">
                                            <em>Seleccione</em>
                                        </MenuItem>
                                        {props.bioanalistas.map((e, keyIndex) => {
                                            return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                        })
                                        }
                                    </Select>
                                    <label className="messageError">{props.errorBioanlistaRecepciona}</label>
                                </FormControl>
                            </div>
                        </Item>
                        <Item>
                            <div className="col-lg">
                                <TextField
                                    id="observations"
                                    autoComplete="off"
                                    type="text"
                                    style={{ height: 'auto', width: '98%' }}
                                    maxLength={500}
                                    multiline={true}
                                    className="form-control"
                                    name="observations"
                                    value={props.observations}
                                    onChange={props.handleChangeObservations}
                                    label="Observaciones" />
                            </div>
                        </Item>
                    </Grid>
                    <Grid item xs={4}>
                        <Item>
                            <div className="col-sm">
                                <TextField
                                    id="codLabRecep"
                                    autoComplete="off"
                                    type="text"
                                    style={{ height: 'auto' }}
                                    maxLength={50}
                                    className="form-control"
                                    name="codLab"
                                    value={props.codLab}
                                    readOnly={true}
                                    inputProps={{
                                        style: { fontWeight: 'bold', backgroundColor: 'none' }
                                    }}
                                    label="Código Lab" />
                            </div>
                        </Item>
                        <Item>
                            <div className="col-sm">
                                {/* <label>Edad</label> */}
                                <TextField
                                    id="ageRecep"
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
                        </Item>
                        <Item>
                            <div className="col-sm">
                                {/* <label>Estudio</label> */}
                                <TextField
                                    id="studyRecep"
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
                                    label="Estudios" />
                            </div>
                        </Item>
                        <Grid container spacing={2}>
                            <Grid item xs={4} hidden={props.hideHouseCHF}>
                                <div className="col-sm">
                                    <Item>
                                        <TextField
                                            id="houseRecep"
                                            autoComplete="off"
                                            type="text"
                                            maxLength={50}
                                            style={{ height: 'auto' }}
                                            className="form-control"
                                            name="houseRecep"
                                            value={props.houseCode}
                                            readOnly={true}
                                            hidden={props.hideHouseCHF}
                                            inputProps={{
                                                style: { fontWeight: 'bold', backgroundColor: 'none' }
                                            }}
                                            label="Casa CHF" />
                                    </Item>
                                </div>
                                
                            </Grid>
                            <Grid item xs={4}>
                                <div className="col-sm">
                                    <Item>
                                        <FormControl className={classes.formControl} hidden={props.hideConsulta} disabled={true}>
                                            <InputLabel id="consulta-input-recep-label">Consulta</InputLabel>
                                            <Select
                                                labelId="consulta-recep-label"
                                                id="consulta-recep-select"
                                                value={props.selectedConsulta}
                                                style={{ fontWeight: "bold", color: "red" }}
                                                onChange={props.handleChangeConsulta}
                                            >
                                                <MenuItem value="0">
                                                    <em>Seleccione</em>
                                                </MenuItem>
                                                {props.consultas.map((e, keyIndex) => {
                                                    return (<MenuItem key={keyIndex} value={e.id}>{e.consulta}</MenuItem>)
                                                })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Item>
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                    <FormControl className={classes.formControl} hidden={props.hideCategoria} disabled={true}>
                                        <InputLabel id="categoria-input-recep-label">Categoría</InputLabel>
                                        <Select
                                            labelId="categoria-recep-label"
                                            id="categoria-recep-select"
                                            value={props.selectedCategory}
                                            onChange={props.handleChangeCategory}
                                            style={{ fontWeight: "bold", color: "red" }}
                                        >
                                            <MenuItem value="0">
                                                <em>Seleccione</em>
                                            </MenuItem>
                                            {props.category.map((e, keyIndex) => {
                                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                            })
                                            }
                                        </Select>
                                    </FormControl>
                                </Item>
                            </Grid>
                        </Grid>
                        <Item>
                            <div className="col-sm">
                                <FormControl className={classes.formControl} hidden={props.hideTypeOfMx}>
                                    <InputLabel id="tipo-muestra-input-recep-label">Tipo de muestra</InputLabel>
                                    <Select
                                        labelId="tipo-muestra-recep-label"
                                        id="tipo-muestra-recep-select"
                                        value={props.selectedTypeOfMxRecep}
                                        onChange={props.handleChangeSelectTypeOfMxRecep}
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
                            <div className="col-sm">
                                <FormControl className={classes.formControl} hidden={props.hideTypeOfTest}>
                                    <InputLabel id="test-input-label">Tipo de prueba</InputLabel>
                                    <Select
                                        labelId="test-label"
                                        id="test-select"
                                        value={props.selectedTypeOfTest}
                                        onChange={props.handleChangeTypeOfTest}>
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
                        </Item>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Item>
                                    <div className="col-sm">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="test-input-tipo-tubo-recep">Tipo de tubo</InputLabel>
                                            <Select
                                                labelId="request-label-recept"
                                                id="request-select"
                                                value={props.selectedTuboRecep}
                                                onChange={props.handleChangeTipoTuboRecep}
                                                disabled={true}
                                                style={{color: 'red'}}
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
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>
                                    <div className="col-sm">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="test-clasificación-recep">Clasificación</InputLabel>
                                            <Select
                                                labelId="request-label-clasificación"
                                                id="request-select-clasificación"
                                                value={props.selectedClassification}
                                                onChange={props.handleChangeClassification}
                                                /* disabled={true} */
                                            >
                                                <MenuItem value="0">
                                                    <em>Seleccione</em>
                                                </MenuItem>
                                                {props.classification.map((e, keyIndex) => {
                                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                                })
                                                }
                                            </Select>
                                            <label className="messageError">{props.errorClassification}</label>
                                        </FormControl>
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <Item>
                                    <div className="col-sm">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="test-visita-recep">Visita</InputLabel>
                                            <Select
                                                labelId="request-label-visita"
                                                id="request-select-visita"
                                                value={props.selectedVisita}
                                                onChange={props.handleChangeVisita}
                                                disabled={true}
                                                style={{color: 'red'}}
                                            >
                                                <MenuItem value="0">
                                                    <em>Seleccione</em>
                                                </MenuItem>
                                                {props.dataVisita.map((e, keyIndex) => {
                                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                                })
                                                }
                                            </Select>
                                            <label className="messageError">{props.errorVisita}</label>
                                        </FormControl>
                                        {/* <label>Edad</label> */}
                                        {/* <TextField
                                            id="visita"
                                            autoComplete="off"
                                            type="text"
                                            maxLength={50}
                                            style={{ height: 'auto' }}
                                            className="form-control"
                                            name="visita"
                                            value={props.visita}
                                            readOnly={true}
                                            inputProps={{
                                                style: { fontWeight: 'bold', backgroundColor: 'none', color: "red" }
                                            }}
                                            label="Visita" /> */}
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={4}>
                                <Item>
                                    <div className="col-sm">
                                        {/* <label>Edad</label> */}
                                        <TextField
                                            id="numMx"
                                            autoComplete="off"
                                            type="text"
                                            maxLength={50}
                                            style={{ height: 'auto' }}
                                            className="form-control"
                                            name="numMx"
                                            value={props.numMx}
                                            inputProps={{
                                                style: { fontWeight: 'bold', backgroundColor: 'none' }
                                            }}
                                            label="Num Mx" />
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                        <Item>
                            <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                <Grid container justify="space-between">
                                    <div className="col-sm">
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog-fif"
                                            label="FIF"
                                            format="dd/MM/yyyy"
                                            autoOk={true}
                                            value={props.fif !== null ? props.fif : null}
                                            onChange={props.handleChangeFif}
                                            disabled={true}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                        <label className="messageError row">{props.errorFif}</label>
                                    </div>
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </Item>
                        <Grid container spacing={2} >
                            <Grid item xs={4} >
                            <Item>
                                <div className="checkbox mleft-20">
                                    <label style={{ color: 'black'}}>Plasma
                                        <input
                                            className="custom-checkbox"
                                            id="state"
                                            type="checkbox"
                                            name="state"
                                            style={{marginLeft: 10}}
                                            disabled={false}
                                            checked={props.plasma}
                                            onChange={props.handleChangePlasma}
                                        />
                                    </label>
                                </div>
                            </Item>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <div style={{ marginTop: 50 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.saveRecepcion}
                        className={classes.button}
                    >Guardar
                    </Button>
                </div>
            </Paper>
        </>
    );
}

export default RecepcionMx;