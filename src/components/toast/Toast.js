import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = (props) => {
    
    const notify = () => {
        switch (props.type) {
            case "info":
                toast.info(props.messageAlert);
                break;
            case "success":
                toast.success(props.messageAlert);
                break;
            case "warning":
                toast.warning(props.messageAlert);
                break;
            case "error":
                toast.error(props.messageAlert);
                break;
            default:
            // code block
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