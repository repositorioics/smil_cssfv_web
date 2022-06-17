import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import Register from '../../../components/security/users/Register';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';

const RegisterContainer = props => {

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [personalCode, setPersonalCode] = useState('');
    let [isActive, setIsActive] = useState(false);
    const [disableBtnSave, setDisableBtnSave] = useState(false);
    const [isNew, setNew] = useState(true);
    const [disabledPwd, setDisabledPwd] = useState(false);
    const [creationDate, setCreationDate] = useState('');
    const [id, setId] = useState('');
    const [executeLoading, setExecuteLoading] = useState(false);

    const [errorMessageName, setErrorMessageName] = useState('');
    const [errorMessageLastName, setErrorMessageLastName] = useState('');
    const [errorMessageUserName, setErrorMessageUserName] = useState('');
    const [errorMessagePassword, setErrorMessagePassword] = useState('');
    const [errorMessageConfirmPwd, setErrorMessageConfirmPwd] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            //getById
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setTitle('Editar usuario');
                getById(props.match.params.id);
                setId(props.match.params.id);
                setNew(false);
                setDisabledPwd(true);
            } else {
                setTitle('Registrar usuario');
                setNew(true);
                setDisabledPwd(false);
            }
        } else {
            props.history.push('/');
        }
    }, [props])

    /**Metodo para obtener el registro a modificar */
    const getById = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getUserById(id);
            if (response.status === 200) {
                setExecuteLoading(false);
                setName(response.data.nombres);
                setLastName(response.data.apellidos);
                setUserName(response.data.usuario);
                setEmail(response.data.correo !== null ? response.data.correo : "");
                setPersonalCode(response.data.codigoPersonal > 0 ? response.data.codigoPersonal : "");
                setIsActive(response.data.activo);
                setCreationDate(response.data.fechaCreacion);
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error)
        }
    }

    const initialStateToast = () => {
        setType(null);
        setMessageAlert(null);
    }

    const handleChangeName = (e) => {
        if (e.target.validity.valid) {
            setName(e.target.value);
        }
        setErrorMessageName('');
    }

    const handleChangeLastName = (e) => {
        if (e.target.validity.valid) {
            setLastName(e.target.value);
        }
        setErrorMessageLastName('');
    }

    const handleChangeUserName = (e) => {
        setUserName(e.target.value);
        const usr = e.target.value;
        if (usr !== '' && usr != null) {
            if (usr.length < 5) {
                setErrorMessageUserName('El usuario debe de tener 5 o más caracteres');
            } else if (/\W|_/g.test(usr)) {
                setErrorMessageUserName('No se permiten caracteres especiales');
            } else {
                setErrorMessageUserName('');
            } 
        } else {
            setErrorMessageUserName('');
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        setErrorMessageEmail('');
    }

    const handleChangePersonalCode = (e) => {
        if (e.target.validity.valid) { 
            setPersonalCode(e.target.value);
        }
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

    const handleChangeIsActive = (e) => {
        isActive = e.target.checked;
        setIsActive(isActive);
    }

    const saveData = (e) => {
        e.preventDefault();
        if (validateData()) {
            if (validateEmail()) {
                if (isNew) {
                    setDisableBtnSave(true);
                    saveUSer();
                } else {
                    //edit
                    editUser();
                }
            }
        }
    }

    const saveUSer = async () => {
        setExecuteLoading(true);
        try {
            const usuario = {
                nombres: name,
                apellidos: lastName,
                clave: password,
                usuario: userName,
                correo: email,
                activo: isActive,
                codigoPersonal: personalCode,
                fechaCreacion: new Date(),
                imagenUrl: "",
                ultimoAcceso: ""
            }
            const response = await DataServices.postUser(usuario);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se guardaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000); */
            }
        } catch (error) {
            setExecuteLoading(false);
            setDisableBtnSave(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const editUser = async () => {
        setExecuteLoading(true);
        try {
            const usuario = {
                id: id,
                nombres: name,
                apellidos: lastName,
                usuario: userName,
                correo: email,
                activo: isActive,
                codigoPersonal: personalCode,
                fechaCreacion: creationDate
            }

            const response = await DataServices.putUser(usuario);
            if (response.status === 200) {
                setExecuteLoading(false);
                setType("success");
                setMessageAlert("Los datos se modificaron correctamente");
                /* setTimeout(function () {
                    
                }, 6000); */
            }
        } catch (error) {
            setExecuteLoading(false);
            console.log('error', error);
        }
        initialStateToast();
    }

    const goBack = () => {
        props.history.push(`/seguridad/usuarios`);
    }

    const clearData = (e) => {
        e.preventDefault();
        setName('');
        setLastName('');
        setPassword('');
        setConfirmPwd('');
        setUserName('');
        setEmail('');
        setIsActive(false);
        setPersonalCode('');
        setDisableBtnSave(false);
    }

    /**Funcion para validar los campos requeridos */
    const validateData = () => {
        if (name === '' || name === null || name === undefined) {
            setErrorMessageName('El nombre es requerido');
            return false;
        }
        if (lastName === '' || lastName === null || lastName === undefined) {
            setErrorMessageLastName('El apellido es requerido');
            return false;
        }
        if (userName === '' || userName === null || userName === undefined) {
            setErrorMessageUserName('El usuario es requerido');
            return false;
        }

        if ((password === '' || password === null || password === undefined) && isNew) {
            setErrorMessagePassword('La contraseña es requerida');
            return false;
        }

        if ((confirmPwd === '' || confirmPwd === null || confirmPwd === undefined) && isNew) {
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

    /**Funcion para validar que el correo sea valido */
    const validateEmail = () => {
        if (email !== '' && email !== null && email !== undefined) {    
            if (!/\S+@\S+\.\S+/.test(email)) {
                setErrorMessageEmail('Dirección de correo electrónico inválida!');
                return false;
            }
        }
        return true;
    }
    
    return (
        <>
            {/* <Header/> */}
            <Register 
                name={name}
                lastName={lastName}
                userName={userName}
                email={email}
                password={password}
                confirmPwd={confirmPwd}
                isActive={isActive}
                personalCode={personalCode}
                handleChangeName={handleChangeName}
                handleChangeLastName={handleChangeLastName}
                handleChangeUserName={handleChangeUserName}
                handleChangeEmail={handleChangeEmail}
                handleChangePassword={handleChangePassword}
                handleChangeConfirmPwd={handleChangeConfirmPwd}
                handleChangeIsActive={handleChangeIsActive}
                handleChangePersonalCode={handleChangePersonalCode}
                errorMessageName={errorMessageName}
                errorMessageLastName={errorMessageLastName}
                errorMessageUserName={errorMessageUserName}
                errorMessagePassword={errorMessagePassword}
                errorMessageConfirmPwd={errorMessageConfirmPwd}
                errorMessageEmail={errorMessageEmail}
                saveData={saveData}
                clearData={clearData}
                disableBtnSave={disableBtnSave}
                title={title}
                disabledPwd={disabledPwd}
                goBack={goBack}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default RegisterContainer;