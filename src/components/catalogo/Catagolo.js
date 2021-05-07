import React from "react";
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import '../catalogo/Catalogo.css';

const Catalogo = props => {
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
                                    {/* <input type="text" className="form-control" placeholder="Enter First Name" name="first-name" required /> */}
                                    <TextField
                                        type="text"
                                        maxLength={64}
                                        pattern="[A-Za-z\s-]+"
                                        value={props.name}
                                        onChange={props.handleChangeName}
                                        className="form-control"
                                        label="Nombre" />
                                    <label className="messageError">{props.errorMessageName}</label>
                                </div>
                                <div className="form-group">
                                    {/* <input type="text" className="form-control" placeholder="Enter Last Name" name="last-name" required /> */}
                                    <TextField
                                        type="text"
                                        maxLength={256}
                                        style={{height: 'auto'}}
                                        value={props.description}
                                        multiline={true}
                                        onChange={props.handleDescription}
                                        className="form-control"
                                        label="Descripción" />
                                </div>
                                <div className="form-group">
                                    <input
                                        checked={props.isChecked}
                                        onChange={props.onChangeCheckbox}
                                        type="checkbox"
                                        name="checkboxG1"
                                        id="checkboxG1"
                                        className="css-checkbox" />
                                    <label
                                        htmlFor="checkboxG1"
                                        className="css-label">
                                        Estado
                                    </label>
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

export default Catalogo;