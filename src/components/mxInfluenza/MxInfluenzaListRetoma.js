import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import Paper from '@material-ui/core/Paper';
import Loading from '../loading/Loading';
import '../mxInfluenza/MxInfluenza.css';

const MxInfluenzaListRetoma = props => {
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

export default MxInfluenzaListRetoma;