import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Loading from '../loading/Loading';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import '../envioMx/EnvioMx.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 300,
        marginTop: 15
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const EnvioMx = props => {
    const classes = useStyles();
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
                                {props.muestrasData.map((e, keyIndex) => {
                                    return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                                })
                                }
                            </Select>
                        </FormControl>
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
                    <Divider />
                    <div style={{ marginTop: 10, boxShadow: "none" }} hidden={props.hideContent}>
                        <div className="hdr, row, m-top">
                            <h4>
                                {props.envioMuestra}
                            </h4>
                        </div>
                        <BootstrapTable
                            striped
                            hover
                            keyField="id"
                            data={props.newData}
                            columns={props.columns2}
                            selectRow={props.selectRowT2}
                            filter={filterFactory()}
                            //pagination={props.pagination}
                            //rowEvents={props.tableRowEvents}
                            filterPosition="inline"
                            noDataIndication="No existen datos que mostrar"
                            wrapperClasses="table-responsive" />
                    </div>
                </div>
                <div className="top-10" hidden={props.hideContent}>
                    <button
                        type="button"
                        className="btn btn-default custom-btn-register btn-float-envioMx"
                        onClick={props.saveData} >Guardar
                    </button>
                </div>
            </Paper>
        </>
    );
}

export default EnvioMx;