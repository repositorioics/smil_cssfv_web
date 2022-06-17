import React from "react";
import CatalogoAnioEstudio from '../CatalogoAnioEstudio';
import Loading from '../../loading/Loading';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Paper from '@material-ui/core/Paper';
import { blue } from '@material-ui/core/colors';
import '../anio-estudio/AnioEstudio.css';

const AnioEstudio = props => {
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper className="container" elevation={3} >
                <CatalogoAnioEstudio
                    handleShow={props.handleShow}
                    handleClose={props.handleClose}
                    show={props.show}
                    title={props.title}
                    fechaInicio={props.fechaInicio}
                    fechaFin={props.fechaFin}
                    anio={props.anio}
                    saveData={props.saveData}
                    handleChangeFechaInicio={props.handleChangeFechaInicio}
                    handleChangeFechaFin={props.handleChangeFechaFin}
                    handleChangeAnio={props.handleChangeAnio}
                    errorFechaInicio={props.errorFechaInicio}
                    errorFechaFin={props.errorFechaFin}
                    errorMessageAnio={props.errorMessageAnio}
                    refreshPage={props.refreshPage}
                />
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

export default AnioEstudio;