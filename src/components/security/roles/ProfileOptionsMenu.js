import React from "react";
//import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
//import { Multiselect } from 'multiselect-react-dropdown';
//import { OverlayTrigger, Tooltip } from 'react-bootstrap';
//import { PlusCircleFill } from 'react-bootstrap-icons';
//import { Multiselect } from 'multiselect-react-dropdown';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loading from '../../loading/Loading';
import Paper from '@material-ui/core/Paper';
import '../roles/Profile.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 300,
        marginTop: 15
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const ProfileOptionsMenu = props => {
    const classes = useStyles();
    //const multiSelectData = [];
    const arr = [];
    /* if (props.profileData.length > 0) {
        for (let i = 0; i < props.profileData.length; i++) {
            const newObject = {}
            newObject.id = props.profileData[i].id;
            newObject.name = props.profileData[i].nombre

            multiSelectData.push(newObject);
        }
    } */
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
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper className="container" elevation={3} >
                <div className="container" style={{ boxShadow: "none" }}>
                    <div className="hdr, row, m-top">
                        <div className="title">
                            {props.titleForm}
                        </div>
                    </div>
                    <div className="c-multiselect-opt-menu">
                    <FormControl className={classes.formControl}>
                        <InputLabel id="perfil-input-label">Seleccione el perfil</InputLabel>
                        <Select
                            labelId="perfil-por-label"
                            id="perfil-por-select"
                            value={props.profileSelected}
                            onChange={props.onSelect}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.profileData.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                            })
                            }
                        </Select>
                    </FormControl>
                        {/* <Multiselect
                            className="c-multiselect-opt-menu"
                            showArrow={true}
                            singleSelect={true}
                            placeholder="Seleccione el perfil"
                            options={multiSelectData} // Options to display in the dropdown
                            selectedValues={props.profileSelected} // Preselected value to persist in dropdown
                            onSelect={props.onSelect} // Function will trigger on select event
                            onRemove={props.onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                        /> */}
                    </div>
                    <div className="top-10" hidden={props.hideContent}>
                        <button
                            type="button"
                            className="btn btn-default custom-btn-register btn-float"
                            onClick={props.saveData} >Guardar
                        </button>
                    </div>
                    <div style={{ marginTop: 10, boxShadow: "none" }} hidden={props.hideContent}>
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
            </Paper>
        </>
    );
}

export default ProfileOptionsMenu;