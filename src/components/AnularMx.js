import React from "react";
import Modal from 'react-bootstrap/Modal';
//import { Multiselect } from 'multiselect-react-dropdown';
import TextField from '@material-ui/core/TextField';
//import Form from 'react-bootstrap/Form'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Col } from 'react-bootstrap'
import '../components/mxInfluenza/MxInfluenza.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 377,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const AnularMx = props => {
    const classes = useStyles();
    return (
        <div className="container">
            <Modal show={props.show} onHide={props.handleClose} backdrop="static" style={{ marginTop: "5%" }}>
                <Modal.Header closeButton>
                    <h2>Anular muestra</h2>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-block" style={{ minHeight: 320 }}>
                        <div className="form">
                            <form>
                                <div>
                                    <Col xs="auto" className="my-1">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="test-input-label">Motivo de anulación</InputLabel>
                                            <Select
                                                labelId="test-label"
                                                id="test-select"
                                                value={props.selectedMotivo}
                                                onChange={props.handleChangeMotivo}
                                            >
                                                <MenuItem value="0">
                                                    <em>Seleccione</em>
                                                </MenuItem>
                                                {props.motivosAnulacion.map((e, keyIndex) => {
                                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                                })
                                                }
                                            </Select>
                                            <label className="messageError">{props.errorMessageOtroMotivoSelected}</label>
                                        </FormControl>
                                    </Col>
                                </div>
                                <div>
                                    <Col xs="auto" className="my-1">
                                        <TextField
                                            id="otroMotivo"
                                            autoComplete="off"
                                            type="text"
                                            maxLength={500}
                                            multiline={true}
                                            className="form-control"
                                            name="otroMotivo"
                                            value={props.otroMotivo}
                                            disabled={props.disabledOtroMotivo}
                                            onChange={props.handleChangeOtroMotivo}
                                            label="Otro motivo de anulación" />
                                        <label className="messageError">{props.errorMessageOtroMotivo}</label>
                                    </Col>
                                </div>
                                <div className="input-group row" style={{ marginTop: 15, marginLeft: 5 }}>
                                    <div className="checkbox mleft-20">
                                        <label>
                                            <input
                                                className="custom-checkbox"
                                                id="ckOtroMotivo"
                                                type="checkbox"
                                                name="ckOtroMotivo"
                                                checked={props.ckOtroMotivo}
                                                onChange={props.handleChangeCkOtroMotivo}
                                            /> Habilitar otro motivo de anulación
                            </label>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "5%", marginLeft: 5 }}>
                                    <div className="col col-lg-2">
                                        <button style={{ backgroundColor: '#88c724', borderColor: '#88c724' }} type="button" className="btn btn-success" onClick={props.saveData}>Guardar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AnularMx;