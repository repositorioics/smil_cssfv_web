import 'date-fns';
import React from "react";
import Modal from 'react-bootstrap/Modal';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import { es } from 'date-fns/locale';
import '../catalogo/Catalogo.css';

const CatalogoAnioEstudio = props => {
    return (
        <div className="container">
            <Modal show={props.show} onHide={props.handleClose} onExit={props.refreshPage} style={{marginTop:"5%"}}>
                <Modal.Header closeButton>
                    <h2>{props.title}</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-block" style={{minHeight:320}}>
                        <div className="form">
                            <form>
                                <div className="form-group">
                                    <MuiPickersUtilsProvider locale={es} utils={DateFnsUtils}>
                                        <Grid container justify="space-between">
                                            <div>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog-fecha-inicio"
                                                    label="Fecha Inicio"
                                                    format="dd/MM/yyyy"
                                                    autoOk={true}
                                                    value={props.fechaInicio !== null ? props.fechaInicio : null}
                                                    onChange={props.handleChangeFechaInicio}
                                                    inputProps={{ autoComplete: 'off' }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                <label className="messageError row">{props.errorFechaInicio}</label>
                                            </div>
                                            <div>
                                                <KeyboardDatePicker
                                                    margin="normal"
                                                    id="date-picker-dialog-fecha-fin"
                                                    label="Fecha Fin"
                                                    format="dd/MM/yyyy"
                                                    autoOk={true}
                                                    value={props.fechaFin !== null ? props.fechaFin : null}
                                                    onChange={props.handleChangeFechaFin}
                                                    inputProps={{ autoComplete: 'off' }}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                />
                                                <label className="messageError row">{props.errorFechaFin}</label>
                                            </div>
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className="form-group">
                                    <TextField
                                        type="number" 
                                        value={props.anio}
                                        onChange={props.handleChangeAnio}
                                        className="form-control"
                                        label="Año del Estudio" 
                                        InputProps={{
                                            inputProps: { min: 0 }
                                        }}
                                        />
                                    <label className="messageError">{props.errorMessageAnio}</label>
                                </div>
                                <button type="button" className="btn btn-default custom-btn" onClick={props.saveData}>Guardar</button>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default CatalogoAnioEstudio;