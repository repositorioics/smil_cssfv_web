import React from "react";
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { blue } from '@material-ui/core/colors';
import '../usersRoles/UserProfile.css';

const UserProfileList = props => {
    return (
        <div className="container" style={{ boxShadow: "none", marginTop:"5%" }}>
            <div className="hdr, row, m-top">
                <div className="title">
                    {props.titleForm}
                </div>
            </div>
            <div className="m-top hover">
            <Link to="/seguridad/asignar-perfil-usuario"><OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Agregar</Tooltip>}>
                    <span className="d-inline-block">
                        <AddCircleIcon style={{ color: blue[500] }} size={20} />
                    </span>
                </OverlayTrigger></Link>
            </div>
            <div className="container" style={{ marginTop: 50, boxShadow: "none" }}>
                <BootstrapTable
                    striped
                    hover
                    keyField="id"
                    data={props.data}
                    columns={props.columns}
                    filter={filterFactory()}
                    pagination={props.pagination}
                    //rowEvents={props.tableRowEvents}
                    filterPosition="inline"
                    noDataIndication="No existen datos que mostrar"
                    wrapperClasses="table-responsive" />
            </div>
        </div>
    );
}

export default UserProfileList;