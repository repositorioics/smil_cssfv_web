import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import * as Constants from '../../Constants';

const useStyles = makeStyles((theme) => ({
    formControl: {
        //margin: theme.spacing(1),
        minWidth: 300,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const DialogImprimirFormatoCodigos = (props) => {
    const classes = useStyles();

    return (
        <div>
            <Dialog disableBackdropClick
                open={props.openFormatoCodigos}
                onClose={props.handleCloseFormatoCodigos}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Instituto de Ciencias Sostenibles"}</DialogTitle>
                <DialogContent>
                    <div className="col-sm">
                        <FormControl className={classes.formControl}>
                            <InputLabel id="test-input-label-request-tipo-codigo">Tipo de código</InputLabel>
                            <Select
                                labelId="request-label-tipo-codigo"
                                id="request-select-tipo-codigo"
                                value={props.formatoCodigo}
                                onChange={props.handleChangeFormatoCodigo}
                            >
                                <MenuItem value="0">
                                    <em>Seleccione</em>
                                </MenuItem>
                                {Constants.TIPOS_CODIGOS.map((e, keyIndex) => {
                                    return (<MenuItem key={keyIndex} value={e.id}>{e.valor}</MenuItem>)
                                })
                                }
                            </Select>
                            <label className="messageError">{props.errorFormatoCodigo}</label>
                        </FormControl>
                    </div>
                    <div className="col-sm">
                        {/* <label>Cod-lab scan</label> */}
                        <TextField
                            id="idCantCopias"
                            autoComplete="off"
                            type="number"
                            style={{ height: 'auto', marginTop: 20 }}
                            className="form-control"
                            name="cantCopias"
                            value={props.cantidadCopiasCod}
                            onChange={props.handleChangeCantCopiasCod}
                            label="Cantidad copias" />
                        <label style={{ marginTop: 10 }} className="messageError">{props.errorCantidadCopiasCod}</label>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseFormatoCodigos} color="primary">
                        Cerrar
                    </Button>
                    <Button onClick={props.imprimir} color="primary" autoFocus>
                        Imprimir
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DialogImprimirFormatoCodigos;
