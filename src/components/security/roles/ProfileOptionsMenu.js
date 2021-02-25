import React from "react";
//import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { Multiselect } from 'multiselect-react-dropdown';
//import { OverlayTrigger, Tooltip } from 'react-bootstrap';
//import { PlusCircleFill } from 'react-bootstrap-icons';
//import { Multiselect } from 'multiselect-react-dropdown';
import '../roles/Profile.css';

const ProfileOptionsMenu = props => {
    const multiSelectData = [];
    const arr = [];
    if (props.profileData.length > 0) {
        for (let i = 0; i < props.profileData.length; i++) {
            const newObject = {}
            newObject.id = props.profileData[i].id;
            newObject.name = props.profileData[i].nombre

            multiSelectData.push(newObject);
        }
    }
    //console.log('profileMenuOptions', props.profileMenuOptions);
    if (props.data.length > 0) {
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].activo === true) {
                arr.push(props.data[i].id);
            }
        }
    }
    props.selectRow.selected = arr;
    
    return (
        <div className="container" style={{ boxShadow: "none", marginTop:"5%" }}>
            <div className="hdr, row, m-top">
                <div className="title">
                    {props.titleForm}
                </div>
            </div>
            <div className="c-multiselect-opt-menu">
                <Multiselect
                    className="c-multiselect-opt-menu"
                    showArrow={true}
                    singleSelect={true}
                    placeholder="Seleccione el perfil"
                    options={multiSelectData} // Options to display in the dropdown
                    selectedValues={props.profileSelected} // Preselected value to persist in dropdown
                    onSelect={props.onSelect} // Function will trigger on select event
                    onRemove={props.onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                />
            </div>
            <div className="top-10" hidden={props.hideContent}>
                <button 
                    type="button" 
                    className="btn btn-default custom-btn-register btn-float" 
                    onClick={props.saveData} >Guardar
                </button>
            </div>
            {/* <div className="m-top hover">
            <Link to="/seguridad/agregar-perfil"><OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Agregar</Tooltip>}>
                    <span className="d-inline-block">
                        <PlusCircleFill color="#1F5271" size={20} />
                    </span>
                </OverlayTrigger></Link>
            </div> */}
            <div className="container" style={{ marginTop: 10, boxShadow: "none" }} hidden={props.hideContent}>
                <BootstrapTable
                    striped
                    hover
                    keyField="id"
                    data={props.data}
                    columns={props.columns}
                    selectRow={props.selectRow}
                    filter={filterFactory()}
                    //pagination={props.pagination}
                    //rowEvents={props.tableRowEvents}
                    filterPosition="inline"
                    noDataIndication="No existen datos que mostrar"
                    wrapperClasses="table-responsive" />
            </div>
        </div>
    );
}

export default ProfileOptionsMenu;