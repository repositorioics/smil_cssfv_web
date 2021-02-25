import React, { useState, useEffect, useRef } from 'react';
import Login from '../../components/login/Login';
import DataServices from '../../service/Api';
import ToastContainer from '../../components/toast/Toast';
//import { useAuth } from '../../context/Auth';

const LoginContainer = props => {
    //const history = useHistory();

    /**Variables de los datos a guardar */
    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    /** Variables de erorres*/
    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessagePwd, setErrorMessagePwd] = useState('');

    const mountedRef = useRef(true);

    //const { setAuthToken } = useAuth();

    const handleChangeName = (e) => {
        setUserName(e.target.value);
        setErrorMessageName('');
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        setErrorMessagePwd('');
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const onKeyPressPwd = (e) => {
        if (e.charCode === 13) {
            e.preventDefault();
            authenticate(e);
        }
    }

    useEffect(() => {
        return () => {
            mountedRef.current = false;
          };
    }, [])

    const authenticate = async (event) => {
        event.preventDefault();
        try {
            if (validateData()) {
                const data = {
                    username: userName,
                    password: password
                }
                if (mountedRef) {
                    const response = await DataServices.login(data);
                    if (response.status === 200) {
                        localStorage.setItem('token', response.data.token);
                        //setAuthToken(response.data.token);
                        setUserName('');
                        setPassword('');
                        props.history.push('/home');
                    }
                }
            }
        } catch (error) {
            console.log(error.response)
            if (error.response !== undefined && error.response !== null && error.response !== '') {
                switch (error.response.data.message) {
                    case "INVALID_CREDENTIALS": //Unauthorized
                        setType("error");
                        setMessageAlert("Usuario y Contraseña incorrectas");
                        break;
                    case "USER_DISABLED": //Forbidden
                        setType("error");
                        setMessageAlert("Usuario deshabilitado, favor contactar con el administrador");
                        break;
                    default:
                        break;
                }
            } else {
                setType("error");
                setMessageAlert("Error de conexión");
            }
        }
        initialStateToast();
    }


    /**Validando los datos requeridos */
    const validateData = () => {
        if (userName === '' || userName === null || userName === undefined) {
            setErrorMessageName('El nombre es requerido');
            return false;

        }
        if (password === '' || password === null || password === undefined) {
            setErrorMessagePwd('La contraseña es requerida');
            return false;
        }
        return true;
    }

    return (
        <>
            <Login
                handleChangeName={handleChangeName}
                handleChangePassword={handleChangePassword}
                authenticate={authenticate}
                errorMessageName={errorMessageName}
                errorMessagePwd={errorMessagePwd}
                onKeyPressPwd={onKeyPressPwd}
            />
            <ToastContainer 
                type={type}
                messageAlert={messageAlert}
            />
        </>

    );
}
export default LoginContainer;