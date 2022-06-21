import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import '../toast/Toast.css';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (props) => {
    
    const notify = () => {
        if (props.messageAlert !== null && props.messageAlert !== undefined && props.messageAlert !== '') {
            switch (props.type) {
                case "info":
                    //toast.info(props.messageAlert);
                    toast.info(<div><InfoIcon/>{props.messageAlert}</div>) // look this line
                    break;
                case "success":
                    //toast.success(props.messageAlert);
                    toast.success(<div><CheckCircleIcon />{props.messageAlert}</div>) // look this line
                    break;
                case "warning":
                    //toast.warning(props.messageAlert);
                    toast.warning(<div><WarningIcon/>{props.messageAlert}</div>) // look this line
                    break;
                case "error":
                    //toast.error(props.messageAlert);
                    toast.error(<div><ErrorIcon/>{props.messageAlert}</div>) // look this line
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <>
            {notify()}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default Toast;