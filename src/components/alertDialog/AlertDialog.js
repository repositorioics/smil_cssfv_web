import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props) => {
    return (
        <div>
            <Dialog disableBackdropClick
                open={props.openAlertDialog}
                onClose={props.handleCloseAlertDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{"Instituto de Ciencias Sostenibles"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.alertMessageDialog}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseAlertDialog} color="primary" autoFocus>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialog;