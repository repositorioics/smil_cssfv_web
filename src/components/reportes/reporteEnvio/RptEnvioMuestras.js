import 'date-fns';
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import SearchIcon from '@material-ui/icons/Search';
import "../reportes.css";

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
    }
}));

const RptEnvioMuestras = props => {
    const classes = useStyles();
    return (
        <>
            <Paper className="container" elevation={3} >
                <div className="title">{props.titleForm}</div>
                <div className="input-group row">
                    <div className="col-sm">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="perfil-input-label">Seleccione el tipo de muestra a enviar</InputLabel>
                            <Select
                                labelId="perfil-por-label"
                                id="perfil-por-select"
                                value={props.selectedEnvioMuestra}
                                onChange={props.handleChangeEnvioMuestra}
                            >
                                <MenuItem value="0">
                                    <em>Seleccione</em>
                                </MenuItem>
                                {props.envioMuestraData.map((e, keyIndex) => {
                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ marginTop: 2 }}>
                        <TextField
                            id="viaje"
                            autoComplete="off"
                            type="number"
                            pattern="^\d*(\.\d{0,2})?$"
                            style={{ marginTop: 13, width: '50%' }}
                            maxLength={50}
                            //className="form-control"
                            name="viaje"
                            value={props.viaje}
                            onChange={props.handleChangeViaje}
                            label="Viaje"
                            className={classes.textField}
                            helperText={props.errorViaje} />
                    </div>
                    <div className="hover" style={{ marginTop: 40, marginLeft: 5 }}>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Buscar</Tooltip>}>
                            <span className="d-inline-block">
                                <SearchIcon onClick={props.searchData} size={20} />
                            </span>
                        </OverlayTrigger>
                    </div>
                    <div className="col-sm hover" style={{ marginTop: 40, width: '10%', marginLeft: 20 }}>
                        <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip">Generar PDF</Tooltip>}>
                            <span className="d-inline-block">
                                <PictureAsPdfIcon onClick={props.getPdfFile} size={20} />
                            </span>
                        </OverlayTrigger>
                    </div>
                </div>
                <div className="row" style={{ marginTop: 15, marginLeft: 5 }}>
                    <div>
                        <TextField
                            id="startDate"
                            label="Fecha inicio"
                            type="date"
                            value={props.startDate}
                            onChange={props.handleChangeStartDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div>
                            <label className="messageError">{props.errorStartDate}</label>
                        </div>
                    </div>
                    <div style={{ marginLeft: 30 }}>
                        <TextField
                            id="endDate"
                            label="Fecha fin"
                            type="date"
                            value={props.endDate}
                            onChange={props.handleChangeEndDate}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <div>
                            <label className="messageError">{props.errorEndDate}</label>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: 20 }}>
                    {props.data.length === 0 ? (
                        "No hay datos que mostrar"
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Código Lab</th>
                                    <th scope="col">Código</th>
                                    <th scope="col">Estudio</th>
                                    <th scope="col">FIF</th>
                                    <th scope="col">Fecha Toma</th>
                                    <th scope="col">Tubo</th>
                                    <th scope="col">Volumen</th>
                                    <th scope="col">Observaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.data.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.muestraId.codLab}</td>
                                        <td>{item.muestraId.codigoParticipante}</td>
                                        <td>{item.muestraId.estudiosParticipante}</td>
                                        <td>{item.muestraId.fif}</td>
                                        <td>{item.muestraId.fechaToma}</td>
                                        <td>{(item.tuboId !== null && item.tuboId !== undefined) ? item.tuboId.descripcion : ""}</td>
                                        <td>{item.muestraId.volumen}</td>
                                        <td>{item.muestraId.observacion}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </Paper>
        </>
    );
}

export default RptEnvioMuestras;