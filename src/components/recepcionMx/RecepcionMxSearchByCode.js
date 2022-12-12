import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Paper from '@material-ui/core/Paper';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
//import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../recepcionMx/RecepcionMx.css';
const style2 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

/* const defaultTheme = createTheme();

const theme = createTheme({
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'dashed' },
                    style: {
                        fontWeight: 'bold',
                        textTransform: 'none',
                        border: `2px dashed ${defaultTheme.palette.primary.main}`,
                        color: defaultTheme.palette.primary.main,
                    },
                },
                {
                    props: { variant: 'dashed', color: 'secondary' },
                    style: {
                        fontWeight: 'bold',
                        border: `2px dashed ${defaultTheme.palette.secondary.main}`,
                        color: defaultTheme.palette.secondary.main,
                    },
                },
                {
                    props: { variant: 'dashed', size: 'small' },
                    style: {
                        fontWeight: 'bold',
                        borderWidth: 4,
                    },
                },
                {
                    props: { variant: 'dashed', color: 'secondary', size: 'small' },
                    style: {
                        fontWeight: 'bold',
                        fontSize: 18,
                    },
                },
            ],
        },
    },
});
 */
function ChildModal(props) {
    return (
        <React.Fragment>
            {/* <ThemeProvider theme={theme}>
                
            </ThemeProvider> */}
            <Button variant="contained"
                    style={{ marginTop: 10 }}
                    onClick={props.handleOpenChild}>Buscar</Button>
            
            <Modal
                hideBackdrop
                open={props.openChildModal !== undefined ? props.openChildModal : false}
                onClose={props.handleCloseChild}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
                style={{ marginTop: 20 }}
            >
                <Paper className="container" elevation={3} >
                    <div style={{ boxShadow: "none" }}>
                        <div className="row">
                            <div className="col-sm">
                                <div className="title">
                                    Muestras
                                </div>
                                <div style={{ float: 'right' }}>
                                    {/* <ThemeProvider theme={theme}>
                                        
                                    </ThemeProvider> */}
                                    <Button variant="contained"
                                            style={{ marginBottom: 10 }}
                                            onClick={props.handleCloseChild}>Cerrar</Button>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: 0, boxShadow: "none" }}>
                            <BootstrapTable
                                striped
                                hover
                                keyField="id"
                                selectRow={props.selectRow}
                                data={props.listMxByCode}
                                columns={props.columns}
                                filter={filterFactory()}
                                pagination={props.pagination}
                                filterPosition="inline"
                                noDataIndication="No existen datos que mostrar"
                                wrapperClasses="table-responsive" />
                        </div>
                    </div>
                </Paper>
            </Modal>
        </React.Fragment>
    );
}

const RecepcionMxSearchByCode = props => {
    return (
        <form>
            <Modal
                open={props.openModal}
                onClose={props.handleCloseModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description">
                <Box sx={{ ...style2, width: 400 }}>
                    <h4 id="parent-modal-title">Buscar participante</h4>
                    <div>
                        <TextField
                            id="searchCode"
                            autoComplete="off"
                            type="number"
                            maxLength={10}
                            style={{ height: 'auto' }}
                            className="form-control"
                            name="code"
                            autoFocus
                            value={props.searchCode}
                            onChange={props.handleChangeSearchCode}
                            onKeyDown={props.onKeySearchCode}
                            inputProps={{
                                style: { fontWeight: 'bold !important', backgroundColor: 'none' }
                            }}
                            label="Código" />
                    </div>
                    <ChildModal
                        listMxByCode={props.listMxByCode}
                        columns={props.columns}
                        selectRow={props.selectRow}
                        pagination={props.pagination}
                        openChildModal={props.openChildModal}
                        handleOpenChild={props.handleOpenChild}
                        handleCloseChild={props.handleCloseChild}
                    />
                </Box>
            </Modal>
        </form>
    );
}

export default RecepcionMxSearchByCode;