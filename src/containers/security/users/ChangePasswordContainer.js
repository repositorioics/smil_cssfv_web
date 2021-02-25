import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import ChangePassword from '../../../components/security/users/ChangePassword';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';

const ChangePasswordContainer = props => {
    const [title] = useState('Cambiar contraseña');

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageConfirmPwd, setErrorMessageConfirmPwd] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            //getById
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setId(props.match.params.id);
            }
        } else {
            props.history.push('/');
        }
    }, [props])

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        const pwd = e.target.value;
        if (pwd !== '' && pwd !== null) {
            if (pwd.length < 8) {
                setErrorMessagePassword('La contraseña debe de tener 8 o más caracteres');
            } else {
                setErrorMessagePassword('');
            }
        } else {
            setErrorMessagePassword('');
        }
    }

    const handleChangeConfirmPwd = (e) => {
        setConfirmPwd(e.target.value);
        //setErrorMessageConfirmPwd();
        const pwd2 = e.target.value;
        if ((password !== null && pwd2 !== null) && (password !== '' && pwd2 !== '')) {
            if (pwd2 !== password) {
                setErrorMessageConfirmPwd('Las contraseñas no coinciden!');
            } else {
                setErrorMessageConfirmPwd('');
            }
        } else {
            setErrorMessageConfirmPwd('');
        }
    }

    /* const clearData = (e) => {
        e.preventDefault();
        setPassword('');
        setConfirmPwd('');
    } */

    /**Funcion para validar los campos requeridos */
    const validateData = () => {
        if (password === '' || password === null || password === undefined) {
            setErrorMessagePassword('La contraseña es requerida');
            return false;
        }

        if (confirmPwd === '' || confirmPwd === null || confirmPwd === undefined) {
            setErrorMessageConfirmPwd('Confirmar contraseña');
            return false;
        }
        if ((password !== null && confirmPwd !== null) && (password !== '' && confirmPwd !== '')) {
            if (confirmPwd !== password) {
                return false;
            } /* else {
                setErrorMessageConfirmPwd('');
            } */
        }
        return true;
    }

    const saveData = (e) => {
        e.preventDefault();
        if (validateData()) {
            ChangeUserPassword();
        }
    }

    const ChangeUserPassword = async () => {
        try {
            const usuario = {
                id: id,
                clave: password
            }

            const response = await DataServices.putUserPassword(usuario);
            if (response.status === 200) {
                setType("success");
                setMessageAlert("Los datos se modificaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000); */
            }
        } catch (error) {
            console.log('error', error);
        }
        initialStateToast();
    }


    return (
        <>
            {/* <Header /> */}
            <ChangePassword
                title={title}
                password={password}
                confirmPwd={confirmPwd}
                handleChangePassword={handleChangePassword}
                handleChangeConfirmPwd={handleChangeConfirmPwd}
                errorMessagePassword={errorMessagePassword}
                errorMessageConfirmPwd={errorMessageConfirmPwd}
                saveData={saveData}
            //clearData={clearData}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default ChangePasswordContainer;