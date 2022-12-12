import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import Paper from '@material-ui/core/Paper';
import Loading from '../loading/Loading';
import '../mxDengue/MxDengue';

const MxDengueListRetoma = props => {
    return (
        <>
            <Loading
                executeLoading={props.executeLoading}
            />
            <Paper className="container" elevation={3} >
                <div style={{ boxShadow: "none" }}>
                    <div className="hdr, row, m-top">
                        <div className="title">
                            {props.titleForm}
                        </div>
                    </div>
                    {/*<div className="m-top hover">
                        <Link to="/muestras/agregar-muestra-influenza"><OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Agregar</Tooltip>}>
                            <span className="d-inline-block">
                                <AddCircleIcon style={{ color: blue[500] }} size={20} />
                            </span>
                        </OverlayTrigger></Link>
                    </div>
                     <div className="input-group row" style={{ marginTop: 15, marginLeft: 10 }}>
                        <div>
                            <TextField
                                id="startDate"
                                label="Fecha inicio"
                                type="date"
                                value={props.startDate}
                                onChange={props.handleChangeStartDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <div>
                                <label className="messageError">{props.errorStartDate}</label>
                            </div>
                        </div>
                        <div style={{ marginLeft: 10 }}>
                            <TextField
                                id="endDate"
                                label="Fecha fin"
                                type="date"
                                value={props.endDate}
                                onChange={props.handleChangeEndDate}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <div>
                                <label className="messageError">{props.errorEndDate}</label>
                            </div>

                        </div>
                        <div style={{ marginLeft: 15 }}>
                            <TextField
                                id="code"
                                label="Código"
                                type="number"
                                autoComplete="off"
                                value={props.code}
                                onChange={props.handleChangeCode}
                                onKeyPress={props.onKeyPressCode}
                            />
                            <label className="messageError">{props.errorCode}</label>
                        </div>
                        <div className="hover" style={{ marginTop: 25, marginLeft: 15 }}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Buscar</Tooltip>}>
                                <span className="d-inline-block">
                                    <SearchIcon onClick={props.searchData} size={20} />
                                </span>
                            </OverlayTrigger>
                        </div>
                        <div className="hover" style={{ marginTop: 25, marginLeft: 25 }}>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip">Limpiar filtros</Tooltip>}>
                                <span className="d-inline-block">
                                    <NotInterestedIcon style={{ color: '#950c0c' }} onClick={props.clearFilters} size={20} />
                                </span>
                            </OverlayTrigger>
                        </div>
                        {/* <div style={{ width: 150 }}>
                            <label>Código</label>
                            <input
                                id="code"
                                style={{height: 23}}
                                autoComplete="off"
                                type="number"
                                maxLength={10}
                                className="form-control"
                                name="code"
                                value={props.code}
                                onChange={props.handleChangeCode}
                                onKeyPress={props.onKeyPressCode}
                                placeholder="Código" />
                            
                        </div> 
                    </div>
                    <Divider /> */}


                    <div style={{ marginTop: 25, boxShadow: "none" }}>
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
            </Paper>
        </>
    );
}

export default MxDengueListRetoma;