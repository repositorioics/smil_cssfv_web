import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Loading from '../../loading/Loading';
import Box from '@mui/material/Box';
import Textarea from "../../../components/textArea/text-area";
import { textarea_appearances } from "../../../components/textArea/text-area";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import '../../../components/catalogo/recepcion/Recepcion.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: '100%',
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

const AddRecepcion = props => {
    const classes = useStyles();
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <div>
                <div className="form-block">
                    <div className="panel panel-info">
                        <div className="hdr, row, m-top">
                            <div className="title">
                                {props.title}
                            </div>
                        </div>
                        <div style={{ paddingTop: 5 }} className="panel-body" >
                            <div style={{ display: "none" }} id="login-alert" className="alert alert-danger col-sm-12"></div>
                            <form onSubmit={e => { e.preventDefault(); }}>
                                <Grid container spacing={2} style={{ paddingTop: 20 }}>
                                    <Grid item xs={3}>
                                        <Item>
                                            <div className="col-sm">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="test-input-label-study">Estudio</InputLabel>
                                                    <Select
                                                        labelId="request-label-study"
                                                        id="request-select-study"
                                                        value={props.selectedStudy}
                                                        onChange={props.handleChangeStudy}
                                                    >
                                                        <MenuItem value="0">
                                                            <em>Seleccione</em>
                                                        </MenuItem>
                                                        {props.study.map((e, keyIndex) => {
                                                            return (<MenuItem key={keyIndex} value={e.codigo}>{e.nombre}</MenuItem>)
                                                        })
                                                        }
                                                    </Select>
                                                    <label className="messageError">{props.errorMessageStudy}</label>
                                                </FormControl>
                                            </div>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Item>
                                            <div className="col-sm">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="test-input-label-type-study">Tipo muestra</InputLabel>
                                                    <Select
                                                        labelId="request-label-type-study"
                                                        id="request-select-type-study"
                                                        value={props.selectedTypeMx}
                                                        onChange={props.handleChangeTypeMx}
                                                    >
                                                        <MenuItem value="0">
                                                            <em>Seleccione</em>
                                                        </MenuItem>
                                                        {props.typeMx.map((e, keyIndex) => {
                                                            return (<MenuItem key={keyIndex} value={e.id}>{e.descripcion}</MenuItem>)
                                                        })
                                                        }
                                                    </Select>
                                                    <label className="messageError">{props.errorMessageTypeMx}</label>
                                                </FormControl>
                                            </div>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Item>
                                            <div className="col-sm">
                                                <FormControl className={classes.formControl}>
                                                    <InputLabel id="test-input-label-type-study">Clasificación muestra</InputLabel>
                                                    <Select
                                                        labelId="request-label-type-study"
                                                        id="request-select-type-study"
                                                        value={props.selectedClasificacionMx}
                                                        onChange={props.handleChangeClasificacionMx}
                                                    >
                                                        <MenuItem value="0">
                                                            <em>Seleccione</em>
                                                        </MenuItem>
                                                        {props.clasificacionMx.map((e, keyIndex) => {
                                                            return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                                        })
                                                        }
                                                    </Select>
                                                    <label className="messageError">{props.errorMessageClasificacionMx}</label>
                                                </FormControl>
                                            </div>
                                        </Item>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Item>
                                            <div className="col-sm">
                                                <TextField
                                                    id="description"
                                                    autoComplete="off"
                                                    type="text"
                                                    className="form-control c-height"
                                                    name="description"
                                                    value={props.description}
                                                    onChange={props.handleChangeDescripcion}
                                                    label="Descripción muestra" />
                                                {/* <label className="messageError">{props.errorMessageDescription}</label> */}
                                            </div>
                                        </Item>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Item>
                                            <div className="col-lg">
                                                <Textarea
                                                    id="criteriosEvaluar"
                                                    label={"Criterios a Evaluar"}
                                                    value={props.criteriosEvaluar}
                                                    handleChange={props.handleChangeCriteriosEvaluar}
                                                    appearance={textarea_appearances.primary}
                                                    rowValue={8}
                                                />
                                            </div>
                                            <label style={{ marginLeft: 20 }} className="messageError">{props.errorMessageCriteriosEvaluar}</label>
                                        </Item>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Item>
                                            <div className="col-lg">
                                                <Textarea
                                                    id="charactersString"
                                                    label={"Cadena de caracteres"}
                                                    value={props.charactersString}
                                                    appearance={textarea_appearances.primary}
                                                    handleChange={props.handleChangeCharactersString}
                                                    rowValue={3}
                                                />
                                            </div>
                                            <label style={{ marginLeft: 20 }} className="messageError">{props.errorMessageCharactersString}</label>
                                        </Item>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Item>
                                            <div className="col-lg">
                                                <Textarea
                                                    id="regex"
                                                    label={"Expresión regular"}
                                                    value={props.regex}
                                                    appearance={textarea_appearances.primary}
                                                    handleChange={props.handleChangeRegex}
                                                    rowValue={3}
                                                />
                                            </div>
                                            <label style={{ marginLeft: 20 }} className="messageError">{props.errorMessageRegex}</label>
                                        </Item>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Item>
                                            <div className="col-lg">
                                                <Textarea
                                                    id="descriptionString"
                                                    label={"Descripción de la cadena"}
                                                    value={props.descriptionString}
                                                    appearance={textarea_appearances.primary}
                                                    handleChange={props.handleChangeDescriptionString}
                                                    rowValue={8}
                                                />
                                            </div>
                                            <label style={{ marginLeft: 20 }} className="messageError">{props.errorMessageDescriptionString}</label>
                                        </Item>
                                    </Grid>
                                </Grid>
                                <div className="checkbox" style={{ marginTop: 10, marginLeft: 25 }}>
                                    <label>
                                        <input
                                            className="custom-checkbox"
                                            id="state"
                                            type="checkbox"
                                            name="state"
                                            checked={props.isActive}
                                            onChange={props.handleChangeIsActive}
                                        /> Activar
                                    </label>
                                </div>
                                <div className="row" style={{ marginTop: 15 }}>
                                    <button style={{ width: '15%' }} type="button" className="btn btn-default custom-btn-register-back" onClick={() => props.goBack()}>Regresar</button>
                                    <button style={{ width: '15%' }} type="button" className="btn btn-default custom-btn-register" onClick={props.saveData} disabled={props.disableBtnSave}>Guardar</button>
                                    <button disabled={props.disableBtnLimpiar} style={{ width: '15%' }} type="button" className="btn btn-default custom-btn-register-clear" onClick={props.clearData}>Limpiar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddRecepcion;