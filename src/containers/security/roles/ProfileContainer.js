import React, { useState, useEffect } from 'react';
//import Header from '../../../components/header/Header';
import Profile from '../../../components/security/roles/Profile';
import DataServices from '../../../service/Api';
import ToastContainer from '../../../components/toast/Toast';

const ProfileContainer = props => {

    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [disableBtnSave,setDisableBtnSave] = useState(false);
    const [isNew, setNew] = useState(true);
    const [id, setId] = useState('');
    const [executeLoading, setExecuteLoading] = useState(false);

    const [errorMessageName, setErrorMessageName] = useState('');

    /**Variables de los mensajes de alerta */
    const [type, setType] = useState(null);
    const [messageAlert, setMessageAlert] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null && token !== undefined && token !== "") {
            //getById
            if (props.match.params && Object.keys(props.match.params).length > 0) {
                setTitle('Editar perfil');
                getById(props.match.params.id);
                setId(props.match.params.id);
                setNew(false);
            } else {
                setTitle('Agregar perfil');
                setNew(true);
            }
        } else {
            props.history.push('/');
        }
    }, [props])

    /**Metodo para obtener todos los registros */
    const getById = async (id) => {
        setExecuteLoading(true);
        try {
            const response = await DataServices.getProfileById(id);
            if (response.status === 200) {
                setExecuteLoading(false);
                setId(response.data.id);
                setName(response.data.nombre);
                setDescription(response.data.descripcion !== null ? response.data.descripcion : "");
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
        setName(e.target.value);
        setErrorMessageName('');
    }

    const handleChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    const saveData = (e) => {
        e.preventDefault();
        if (validateData()) {
            if (isNew) {
                setDisableBtnSave(true);
                saveProfile();
            } else {
                //edit
                editProfile();
            }
        }
    }

    const saveProfile = async () => {
        setExecuteLoading(true);
        try {
            const perfil = {
                nombre: name,
                descripcion: description
            }
            const response = await DataServices.postProfile(perfil);
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

    const editProfile = async () => {
        setExecuteLoading(true);
        try {
            const perfil = {
                id: id,
                nombre: name,
                descripcion: description
            }

            const response = await DataServices.putProfile(perfil);
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

    const clearData = (e) => {
        e.preventDefault();
        setName('');
        setDescription('');
        setDisableBtnSave(false);
    }

    /**Funcion para validar los campos requeridos */
    const validateData = () => {
        if (name === '' || name === null || name === undefined) {
            setErrorMessageName('El nombre es requerido');
            return false;
        }
        return true;
    }

    return (
        <>
            {/* <Header /> */}
            <Profile 
                name={name}
                description={description}
                handleChangeName={handleChangeName}
                handleChangeDescription={handleChangeDescription}
                errorMessageName={errorMessageName}
                saveData={saveData}
                clearData={clearData}
                disableBtnSave={disableBtnSave}
                title={title}
                executeLoading={executeLoading}
            />
            <ToastContainer
                type={type}
                messageAlert={messageAlert}
            />
        </>
    );
}

export default ProfileContainer;