import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialogText = (props) => {
    return (
        <div>
            <Dialog disableBackdropClick
                open={props.openAlertDialogText}
                onClose={props.cancelAlertDialogText}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Instituto de Ciencias Sostenibles"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.alertMessageDialogText}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="motivoSinFif"
                        label="Motivo para ingresar el registro sin FIF"
                        type="text"
                        value={props.motivoNoFif}
                        fullWidth
                        maxLength={500}
                        multiline={true}
                        onChange={props.handleChangeAlertMotivoNoFif}
                    />
                    <label style={{ marginTop: 5 }} className="messageError">{props.errorAlertMotivoNoFif}</label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.cancelAlertDialogText} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={props.acceptAlertDialogText} color="primary">
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialogText;