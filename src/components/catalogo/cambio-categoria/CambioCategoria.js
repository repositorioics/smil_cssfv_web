import React from "react";
import Catalogo from '../Catagolo';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { blue } from '@material-ui/core/colors';

const CambioCategoria = props => {
    
    return (
        <>
            <>
            <Catalogo
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
            />
            <div className="container" style={{ boxShadow: "none", marginTop:"5%"}}>
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
                <div className="container" style={{ marginTop: 50, boxShadow: "none"}}>
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
        </>
        </>

    );
}

export default CambioCategoria;