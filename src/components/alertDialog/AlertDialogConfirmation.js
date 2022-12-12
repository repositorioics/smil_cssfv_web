import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const  AlertDialogConfirmation = (props) => {
  return (
    <div>
      <Dialog
        open={props.openAlertDialogConfirm}
        onClose={props.handleCloseAlertDialogConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Instituto de Ciencias Sostenibles"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.confirmationMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseAlertDialogConfirm}>Cancelar</Button>
          <Button onClick={props.handleConfirmationAlertDialog}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialogConfirmation;
