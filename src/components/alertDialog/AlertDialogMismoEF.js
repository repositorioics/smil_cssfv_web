import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 525,
        marginTop: 15,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

const AlertDialogMismoEF = (props) => {
    const classes = useStyles();
    let newFif = '';
    if (props.fif !== '' && props.fif !== null && props.fif !== undefined) {
        newFif = moment(props.fif).format('YYYY-MM-DD');
    }
    return (
        <div>
            <Dialog disableBackdropClick
                open={props.openAlertDialogMismoEF}
                onClose={props.cancelAlertDialogMismoEF}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Instituto de Ciencias Sostenibles"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.alertMessageDialogMismoEF}
                        {props.alertMessageDifFif}
                    </DialogContentText>
                    <div className="input-group row" style={{ marginTop: 10 }}>
                        <div className="col-sm">
                            <TextField
                                id="fifUltMxTomada"
                                autoComplete="off"
                                type="text"
                                style={{ marginTop: 15 }}
                                className="form-control"
                                name="fifUltMxTomada"
                                value={props.fifUltMxTomada}
                                disabled={true}
                                label="FIF de la última mx tomada" 
                                inputProps={{
                                    style: { color: 'black', fontWeight: 'bold' }
                                }}/>
                        </div>
                        <div className="col-sm">
                            <TextField
                                id="newFif"
                                autoComplete="off"
                                type="text"
                                style={{ marginTop: 15 }}
                                className="form-control"
                                name="newFif"
                                value={newFif}
                                disabled={true}
                                label="FIF Ingresada" 
                                inputProps={{
                                    style: { color: 'red', fontWeight: 'bold' }
                                }}/>
                        </div>
                    </div>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="mismo-ep-febril">Motivo mismo episodio FIF</InputLabel>
                        <Select
                            labelId="mismo-ep-febril-label"
                            id="mismo-ep-febril-select"
                            value={props.selectedMismoEpFif}
                            onChange={props.handleChangeMismoEpFifDialog}
                        >
                            <MenuItem value="0">
                                <em>Seleccione</em>
                            </MenuItem>
                            {props.mismoEpFif.map((e, keyIndex) => {
                                return (<MenuItem key={keyIndex} value={e.id}>{e.nombre}</MenuItem>)
                            })
                            }
                        </Select>
                    </FormControl>
                    <label style={{ marginTop: 5 }} className="messageError">{props.errorMismoEpFifDialog}</label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.cancelAlertDialogMismoEF} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={props.acceptAlertDialogMismoEF} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialogMismoEF;