import React from "react";
//import Catalogo from '../Catagolo';
import Loading from '../../loading/Loading';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Paper from '@material-ui/core/Paper';
import { blue } from '@material-ui/core/colors';
import Modal from 'react-bootstrap/Modal';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../tipo-pruebas/TipoPruebas.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 400,
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
  }))

const TipoPruebas = props => {
    const classes = useStyles();
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper className="container" elevation={3} >
                {/* <Catalogo
                    handleShow={props.handleShow}
                    handleClose={props.handleClose}
                    show={props.show}
                    title={props.title}
                    errorMessageName={props.errorMessageName}
                    handleChangeName={props.handleChangeName}
                    handleDescription={props.handleDescription}
                    onChangeCheckbox={props.onChangeCheckbox}
                    saveData={props.saveData}
                    name={props.name}
                    description={props.description}
                    isChecked={props.isChecked}
                    refreshPage={props.refreshPage}
                /> */}
                <Modal show={props.show} onHide={props.handleClose} onExit={props.refreshPage} style={{ marginTop: "5%" }}>
                    <Modal.Header closeButton>
                        <h2>{props.title}</h2>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-block" style={{ minHeight: 320 }}>
                            <div className="form">
                                <form>
                                    <div className="form-group">
                                        {/* <input type="text" className="form-control" placeholder="Enter First Name" name="first-name" required /> */}
                                        <TextField
                                            type="text"
                                            maxLength={64}
                                            value={props.name}
                                            onChange={props.handleChangeName}
                                            className="form-control"
                                            label="Nombre" />
                                        <label className="messageError">{props.errorMessageName}</label>
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="text"
                                            maxLength={256}
                                            style={{ height: 'auto' }}
                                            value={props.description}
                                            multiline={true}
                                            onChange={props.handleDescription}
                                            className="form-control"
                                            label="Descripci??n" />
                                    </div>
                                    <div className="form-group">
                                        <FormControl className={classes.formControl}>
                                            <InputLabel id="mx-input-label">Seleccione la muestra</InputLabel>
                                            <Select
                                                labelId="mx-label"
                                                id="mx-select"
                                                value={props.selectedMx}
                                                onChange={props.handleChangeMx}
                                            >
                                                <MenuItem value="0">
                                                    <em>Seleccione</em>
                                                </MenuItem>
                                                {props.dataMx.map((e, keyIndex) => {
                                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)})
                                                }
                                            </Select>
                                            <label className="messageError">{props.errorMessageMx}</label>
                                        </FormControl>
                                    </div>
                                    <div className="form-group">
                                        <TextField
                                            type="number"
                                            style={{ height: 'auto' }}
                                            value={props.level}
                                            multiline={true}
                                            onChange={props.handleChangeLevel}
                                            className="form-control"
                                            label="Nivel" />
                                            <label className="messageError">{props.errorMessageLevel}</label>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            checked={props.isChecked}
                                            onChange={props.onChangeCheckbox}
                                            type="checkbox"
                                            name="chkResultMx"
                                            id="ResultMx"
                                            className="css-checkbox" />
                                        <label
                                            htmlFor="ResultMx"
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
                <div style={{ boxShadow: "none" }}>
                    <div className="hdr, row, m-top">
                        <div className="title">
                            {props.titleForm}
                        </div>
                    </div>
                    <div className="m-top hover">
                        <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Agregar</Tooltip>}>
                            <span className="d-inline-block">
                                <AddCircleIcon style={{ color: blue[500] }} size={20} onClick={props.handleShow} />
                            </span>
                        </OverlayTrigger>
                    </div>
                    <div style={{ marginTop: 50, boxShadow: "none" }}>
                        <BootstrapTable
                            striped
                            hover
                            keyField="id"
                            data={props.data}
                            columns={props.columns}
                            filter={filterFactory()}
                            pagination={props.pagination}
                            rowEvents={props.tableRowEvents}
                            filterPosition="inline"
                            noDataIndication="No existen datos que mostrar"
                            wrapperClasses="table-responsive" />
                    </div>
                </div>
            </Paper>
        </>
    );
}

export default TipoPruebas;